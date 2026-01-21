const { range } = require("rxjs");
const pool = require("../config/db.config");
// const poolGapo = require("../config/db.configpgGpao");
const axios = require("axios");

// Add Menu
const getMenu = (req, res, next) => {
    const accessibilite = req.body.accessibilite;
    pool.query(
        "SELECT id_menu, nom_menu, route_menu, rang_menu::INTEGER, icon_menu, sous_menu, accessibilite FROM menu WHERE accessibilite BETWEEN 1 AND $1 ORDER BY rang_menu ASC",
        [accessibilite],
        function (err, result) {
            if (err)  return  res.status(400).send(err);

            if (result.rows && result.rows.length > 0) {
                res.status(200).send(result.rows);
            } else {
                res.status(200).send([]);
            }
        }
    );
};


// Add Menu
const getDateNow = (req, res, next) => {     
    pool.query("select now()", [], function (err, result) {
       if (err) {
        return  res.status(400).send(err);
    }
    if (result.rows && result.rows.length > 0) {
        res.status(200).send(result.rows);
    } else {
        res.status(200).send();
    }
});
};

// Get Max Rank Menu
const getMaxRangMenu = (req, res, next) => {     
    pool.query("select max(rang_menu) from menu", [], function (err, result) {
       if (err) {
        return  res.status(400).send(err);
    }
    if (result.rows && result.rows.length > 0) {
        res.status(200).send(result.rows);
    } else {
        res.status(200).send();
    }
});
};

// Insert Menu
const insertMenu = (req, res, next) => {
    const { nom_menu, route_menu, icon_menu, accessibilite } = req.body;

    pool.query("SELECT (MAX(rang_menu::INTEGER) + 1) AS max FROM menu", [], function(err, result) {
        if (err) return res.status(400).send(err);

        const rang_menu = (result.rows[0].max || 1); // si table vide, commence à 1

        pool.query(
            "INSERT INTO menu (nom_menu, route_menu, rang_menu, icon_menu, sous_menu, accessibilite) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
            [nom_menu, route_menu, rang_menu, icon_menu, "[]", accessibilite],
            function(err, result) {
                if (err) 
                       
                    return  res.status(400).send(err);

                res.status(200).send(result.rows); // toujours envoyer rows
            }
        );
    });
};

// Update Menu
const updateMenu = (req, res, next) => { 
    const id_menu = req.body.id_menu
    const nom_menu = req.body.nom_menu
    const route_menu = req.body.route_menu
    const rang_menu = req.body.rang_menu    
    const icon_menu = req.body.icon_menu 
    const accessibilite = req.body.accessibilite   
    pool.query("update menu set nom_menu = $1, route_menu = $2, rang_menu = $3, icon_menu = $4, accessibilite = $6 where id_menu = $5", [nom_menu, route_menu, rang_menu, icon_menu, id_menu, accessibilite], function (err, result) {
       if (err) {
        return  res.status(400).send(err);
    }
    if (result.rows && result.rows.length > 0) {
        res.status(200).send(result.rows);
    } else {
        res.status(200).send();
    }
});
};

// Delete Menu
const supprimerMenu = (req, res, next) => { 
    const id_menu = req.body.id_menu   
    pool.query("delete from menu where id_menu = $1", [id_menu], function (err, result) {
       if (err) {
        return  res.status(400).send(err);
    }
    if (result.rows && result.rows.length > 0) {
        res.status(200).send(result.rows);
    } else {
        res.status(200).send();
    }
});
};

// Login
const getLogin = (req, res, next) => {  
    const matricule = req.body.matricule
    const password = req.body.password   
    pool.query("select count(*) from utilisateur where matricule = $1 and password_user = $2", [matricule, password], function (err, result) {
       if (err) {
        return  res.status(400).send(err);
    }
    if (result.rows && result.rows.length > 0) {
        res.status(200).send(result.rows);
    } else {
        res.status(200).send();
    }
    });
};

// Update Rang Menu
const updateRangMenu = (req, res, next) => {  
    const range = req.body.range
    const id_menu = req.body.id_menu
    pool.query("update menu set rang_menu = $1 where id_menu = $2", [range,id_menu], function (err, result) {
        if (err) {
            return  res.status(400).send(err);
        }
        if (result.rows && result.rows.length > 0) {
            res.status(200).send(result.rows);
        } else {
            res.status(200).send();
        }
    });
};

// Update Rang Menu
const updateSousMenu = (req, res, next) => {  
    const id_menu = req.body.id_menu
    const restSousMenu = req.body.restSousMenu
    pool.query("update menu set sous_menu = $1 where id_menu = $2", [restSousMenu,id_menu], function (err, result) {
        if (err) {
            return  res.status(400).send(err);
        }
        if (result.rows && result.rows.length > 0) {
            res.status(200).send(result.rows);
        } else {
            res.status(200).send();
        }
    });
};

// Titre
const getTitre = (req, res, next) => {  
    pool.query("select * from titre", [], function (err, result) {
       if (err) {
        console.log('er', err);
        
        return  res.status(400).send(err);
    }
    if (result.rows && result.rows.length > 0) {
        res.status(200).send(result.rows);
    } else {
        res.status(200).send();
    }
});
};

// Update Rang Menu
const updateTitre = (req, res, next) => {  
    const titreLogin = req.body.titreLogin
    const titreMenuMax = req.body.titreMenuMax
    const titreMenuMin = req.body.titreMenuMin
    pool.query("update titre set \"titreLogin\" = $1, \"titreMenuMax\" = $2, \"titreMenuMin\" = $3", [titreLogin,titreMenuMax,titreMenuMin], function (err, result) {
        if (err) {
            return  res.status(400).send(err);
        }
        if (result.rows && result.rows.length > 0) {
            res.status(200).send(result.rows);
        } else {
            res.status(200).send();
        }
    });
};

// Login from gpao
const getLoginFromGpao = (req, res, next) => {  
    const matricule = req.body.matricule
    const password = req.body.password   
    pool.query("select * from utilisateur where matricule = $1 and password_user = $2", [matricule, password], function (err, result) {
       if (err) {
        return  res.status(400).send(err);
    }
    if (result.rows && result.rows.length > 0) {
        res.status(200).send(result.rows);
    } else {
        res.status(200).send();
    }
    });
};

// Login from compte AD
const getLoginFromCompteAD = async (req, res, next) => {  
    const { matricule, password } = req.body;  // tu récupères depuis Angular ou Postman

    const microService = "http://192.168.12.170/luminess-ad-authentication-microservice/auth/ldap";

    console.log("URL du microservice:", microService);

    try {
        const response = await axios.post(microService, {
            username: matricule,
            password: password
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        return res.status(200).json({ 
            message: "Appel microservice réussi", 
            data: response.data 
        });

    } catch (err) {
        console.error("Erreur lors de l'appel au microservice:", err.message);

        return res.status(500).json({ 
            message: "Erreur appel microservice", 
            error: err.response ? err.response.data : err.message 
        });
    }
};

module.exports = {getMenu, getDateNow, getLogin, getMaxRangMenu, updateMenu, updateRangMenu, supprimerMenu, insertMenu,updateSousMenu, getTitre, updateTitre, 
    getLoginFromGpao, getLoginFromCompteAD};