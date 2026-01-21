const express = require('express'); //import express
const router  = express.Router(); 

const menuController = require('../controllers/menu_controller'); 
router.post('/get-menu', menuController.getMenu); 
router.get('/get-date', menuController.getDateNow); 
router.post('/get-login', menuController.getLogin); 
router.get('/get-max-rang-menu', menuController.getMaxRangMenu)
router.post('/update-menu', menuController.updateMenu)
router.post('/update-rang-menu', menuController.updateRangMenu)
router.post('/supprimer-menu', menuController.supprimerMenu)
router.post('/insert-menu', menuController.insertMenu)
router.post('/update_sous_menu', menuController.updateSousMenu)
router.get('/get-titre', menuController.getTitre)
router.post('/update-titre', menuController.updateTitre)
router.post('/login-gpao', menuController.getLoginFromGpao)
router.post('/login-ad', menuController.getLoginFromCompteAD)

const usersController = require('../controllers/users_controller'); 
router.get('/get-all-users', usersController.getAllUsers);
router.post('/delete-user', usersController.deleteUser);
router.post('/insert-users', usersController.insertUser);
router.post('/update-users', usersController.updateUser);
router.post('/get-user', usersController.getUser);
// router.post('/get-user-gpao', usersController.getAllUsersGPAO); 
router.get('/get-processus-lean', usersController.getProcessusLean);
router.post('/update-user-manager', usersController.updateUserManager);

const dateTimeController = require('../controllers/date_controller');
router.get('/get-date-time', dateTimeController.getDateTime);

// upload file
const controller = require('../controllers/file.controller');
router.post('/upload', controller.upload);
router.get("/files", controller.getListFiles);
router.get("/files/:name", controller.download);


const formationcontroll = require('../controllers/formation/formation_controller')
// router.post('/get-info-perso', formationcontroll.getInfoPerso)
router.post('/insertion-demande-formation', formationcontroll.insertionDemandeFormation)
router.post('/get-demande-formation', formationcontroll.getAllDemandeFormation)
router.post('/get-demande-formation-by-id', formationcontroll.getDemandeFormationById)
router.post('/save-prospection', formationcontroll.saveProspection)
router.post('/download-pj', formationcontroll.downloadPJ)
// router.post('/get-all-processus-gpao', formationcontroll.getAllProcessusFromGPAO)
router.post('/validation-demande', formationcontroll.validationDemande)
router.post('/update-data-demande-prospection', formationcontroll.updateDataDemandeProspection)
router.post('/get-all-evaluation-chaud', formationcontroll.getAllEvaluationChaud)
router.post('/save-evaluation-chaud', formationcontroll.saveEvaluationChaud)
router.post('/update-date-reelle-formation', formationcontroll.updateDateReelleFormation)

module.exports = router; // export to use in server.js
