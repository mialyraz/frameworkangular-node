const pool = require("../../config/db.config");
// const poolGPAO = require("../../config/db.configpgGpao");
// const poolLean = require("../../config/db.configlean");
const path = require("path");
const fs = require("fs");

// const getInfoPerso = async (req, res) => {
//     const { matricule = null } = req.body
//     try {
//         let query_get = `select o.matricule, o.nom, o.prenoms, f.num_fonction, f.nom_fonction, l.id_ligne, l.libelle from public.operateur o 
//                         left join public.fonction f on f.num_fonction = o.fct 
//                         left join public.ligne l on l.id_ligne = o.ligne_defaut
//                         where matricule = $1`
//         let { rows: data } = await poolGPAO.query(query_get, [matricule])
//         return res.status(200).send(data);
//     } catch (err) {
//         return res.status(400).send({ message: err.message });
//     }
// };

const insertionDemandeFormation = async (req, res) => {
    const {
        intitule = null,
        beneficiaire_string = null,
        contexte = null,
        situation = null,
        enjeux_consequence = null,
        competence_string = null,
        indicateur = null,
        resultat = null,
        nombre_participant_prevu = null,
        profil_string = null,
        departement_string = null,
        type_formation = null,
        matricule_demandeur = null,
        nom_demandeur = null,
        ligne_demandeur = null
    } = req.body
    try {
        let query_insert = `INSERT INTO formation.demande
                        (matricule_demandeur, nom_demandeur, ligne_demandeur, intitule_formation, beneficiaire, context, situation, enjeux_consequence, competence_developper, indicateur, resultat_attendu, nombre_participant_prevu, profil_participant, departement_participant, type_formation)
                        VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15);`
        await pool.query(query_insert, [matricule_demandeur, nom_demandeur, ligne_demandeur, intitule, beneficiaire_string, contexte, situation, enjeux_consequence, competence_string, indicateur, resultat, nombre_participant_prevu, profil_string, departement_string, type_formation])
        return res.status(200).send();
    } catch (err) {
        return res.status(400).send({ message: err.message });
    }
};

const getAllDemandeFormation = async (req, res) => {
    try {
        let query_get = `select * from formation.demande_view order by id_demande desc`
        let { rows: data } = await pool.query(query_get)
        return res.status(200).send(data);
    } catch (err) {
        return res.status(400).send({ message: err.message });
    }
};

const getDemandeFormationById = async (req, res) => {
    const { id_demande = null } = req.body
    try {
        let query_get = `select * from formation.demande_view where id_demande = $1`
        let { rows: data } = await pool.query(query_get, [id_demande])
        return res.status(200).send(data);
    } catch (err) {
        return res.status(400).send({ message: err.message });
    }
};


const saveProspection = async (req, res) => {
    const {
        type_formation = null,
        organisme = null,
        dateDebut = null,
        dateFin = null,
        lieu = null,
        duree = null,
        cout = null,
        formateur = null,
        commentaireRH = null,
        id_demande = null
    } = JSON.parse(req.body.data)

    try {
        let file = null
        let filename = ""

        if (req.files && req.files.file) {
            file = req.files.file
        }

        if (file != null) {
            const dossier = `demande_${id_demande}`
            filename = file.name
            const dirname = path.join(__basedir, "upload", "pj_suivi_formation", dossier)
            if (!fs.existsSync(dirname)) {
                fs.mkdirSync(dirname, { recursive: true });
            }
            const dest = path.join(dirname, filename);
            file.mv(dest);
            console.log("Fichier uploader")
        }

        let query_insert = `INSERT INTO formation.prospection
                            (id_demande, type_formation, organisme, date_debut, date_fin, lieu, duree, cout, formateur, commentaire_rh, piece_jointe)
                            VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) returning *;`
        let { rows: data } = await pool.query(query_insert, [id_demande, type_formation, organisme, dateDebut, dateFin, lieu, duree, cout, formateur, commentaireRH, filename])

        let update_statut_demande = `UPDATE formation.demande SET statut_demande = 1 where id_demande = $1`
        await pool.query(update_statut_demande, [id_demande])

        return res.status(200).send(data);
    }
    catch (err) {
        return res.status(400).send({ message: err.message });
    }
};

const downloadPJ = async (req, res) => {
    const { id_demande = null, pj = null } = req.body
    try {
        const dossier = `demande_${id_demande}`
        const fullpath = path.join(__basedir, "upload", "pj_suivi_formation", dossier, pj)
        if (fs.existsSync(fullpath)) {
            return res.status(200).download(fullpath);
        }
    }
    catch (err) {
        return res.status(400).send({ message: err.message });
    }
}

// const getAllProcessusFromGPAO = async (req, res) => {
//     try {
//         let query = `select * from public.processus`
//         let { rows: data } = await poolGPAO.query(query)
//         return res.status(200).send(data);
//     }
//     catch (err) {
//         return res.status(400).send({ message: err.message });
//     }
// }

const validationDemande = async (req, res) => {
    const { id_demande = null, is_valide = null, commentaire_validateur = null } = req.body
    try {
        let statut_validation = is_valide ? `2` : `3`
        let query = `update formation.demande set statut_demande = $1 where id_demande = $2`
        await pool.query(query, [statut_validation, id_demande])

        let query_update_commentaire = `update formation.prospection set commentaire_validateur = $1 where id_demande = $2`
        await pool.query(query_update_commentaire, [commentaire_validateur, id_demande])

        return res.status(200).send();
    }
    catch (err) {
        return res.status(400).send({ message: err.message });
    }
}

const updateDataDemandeProspection = async (req, res) => {
    const {
        type_formation = null,
        organisme = null,
        dateDebut = null,
        dateFin = null,
        lieu = null,
        duree = null,
        cout = null,
        formateur = null,
        commentaireRH = null,
        id_demande = null,
        beneficiaire = null
    } = req.body

    try {
        let query_update = `update formation.demande set beneficiaire = $1 where id_demande = $2`
        await pool.query(query_update, [beneficiaire, id_demande])

        let query_update_prospection = `UPDATE formation.prospection
            SET type_formation=$2, organisme=$3, date_debut=$4, date_fin=$5, lieu=$6, duree=$7, cout=$8, formateur=$9, commentaire_rh=$10
            WHERE id_demande = $1;`
        await pool.query(query_update_prospection, [id_demande, type_formation, organisme, dateDebut, dateFin, lieu, duree, cout, formateur, commentaireRH])

        return res.status(200).send();
    }
    catch (err) {
        return res.status(400).send({ message: err.message });
    }

}

const getAllEvaluationChaud = async (req, res) => {
    try {
        let query = `select * from formation.evaluation_chaud`
        let { rows: data } = await pool.query(query)
        return res.status(200).send(data);
    }
    catch (err) {
        return res.status(400).send({ message: err.message });
    }
}

const saveEvaluationChaud = async (req, res) => {
    const {
        id_demande = null,
        matricule = null,
        nom_prenom = null,
        q_contenu_formation = null,
        q_formateur = null,
        q_impact = null,
        q_appreciation_generale = null,
        comment_1 = null,
        comment_2 = null,
        comment_3 = null,
        plan_action = null,
        date_debut_evaluation_froid = null,
        date_fin_evaluation_froid = null
    } = req.body
    try {

        let query = `INSERT INTO formation.evaluation_chaud
        (id_demande, matricule, nom_prenom, q_contenu_formation, q_formateur, q_impact, q_appreciation_generale, comment_1, comment_2, comment_3, plan_action, date_debut_evaluation_froid, date_fin_evaluation_froid)
        VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) returning id_evaluation_chaud;`
        let { rows: data } = await pool.query(query, [id_demande, matricule, nom_prenom, JSON.stringify(q_contenu_formation), JSON.stringify(q_formateur), JSON.stringify(q_impact), JSON.stringify(q_appreciation_generale), JSON.stringify(comment_1), JSON.stringify(comment_2), JSON.stringify(comment_3), JSON.stringify(plan_action), date_debut_evaluation_froid, date_fin_evaluation_froid])
        let id_evaluation_chaud = data[0].id_evaluation_chaud

        plan_action.forEach(async (element) => {
            if (element.tache != "" && element.objectif != "") {
                let query_insert_plan_action = `INSERT INTO formation.plan_action
                (matricule, id_demande, tache, objectif, kb, date_prevue, id_evaluation_chaud)
                VALUES($1,$2,$3,$4,$5,$6,$7);`
                await pool.query(query_insert_plan_action, [matricule, id_demande, element.tache, element.objectif, element.kb, element.date_prevue, id_evaluation_chaud])
            }
        })

        return res.status(200).send();
    }
    catch (err) {
        return res.status(400).send({ message: err.message });
    }
}

const updateDateReelleFormation = async (req, res) => {
    const {
        id_demande = null,
        dateDebutReelle = null,
        dateFinReelle = null,
        date_evaluation_chaud_iso = null,
        date_debut_evaluation_froid = null,
        date_evaluation_froid_iso = null
    } = req.body
    try {
        let update_date_reelle = `update formation.prospection set date_fin_reelle = $1, date_fin_evaluation_chaud = $2, date_debut_evaluation_froid = $3, date_fin_evaluation_froid = $4, date_debut_reelle = $6 where id_demande = $5`
        await pool.query(update_date_reelle, [dateFinReelle, date_evaluation_chaud_iso, date_debut_evaluation_froid, date_evaluation_froid_iso, id_demande, dateDebutReelle])
        return res.status(200).send();
    }
    catch (err) {
        return res.status(400).send({ message: err.message });
    }
}

module.exports = {
    // getInfoPerso,
    insertionDemandeFormation,
    getAllDemandeFormation,
    getDemandeFormationById,
    saveProspection,
    downloadPJ,
    // getAllProcessusFromGPAO,
    validationDemande,
    updateDataDemandeProspection,
    getAllEvaluationChaud,
    saveEvaluationChaud,
    updateDateReelleFormation
};