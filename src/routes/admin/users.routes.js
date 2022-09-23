const express = require("express");
const router = express.Router();
const request = require("../../requests/admin/users.request");
const controller = require("../../controllers/admin/users.controller");
const User = require("../../models/user.model");



router.route("/admin").get(controller.indexByRole(1));
router.post("/admin", request.storeAdminAndConsultant, controller.storeAdminAndConsultant);
router.put("/admin/:user_id", request.updateAdminAndConsultant, controller.updateAdminAndConsultant);

router.route("/locals").get(controller.indexByRole(2));
router.post('/locals', request.storeProducerAndLocal, controller.storeLocal)
router.put("/locals/:user_id", request.updateProducerAndLocal, controller.updateLocal);

router.route("/externals").get(controller.indexByRole(3));
router.post('/externals', request.storeExternals, controller.storeExternal)
router.put("/externals/:user_id", request.updateExternals, controller.updateExternal);

router.route("/producers").get(controller.indexByRole(4));
router.post('/producers', request.storeProducerAndLocal, controller.storeProducer)
router.put("/producers/:user_id", request.updateProducerAndLocal, controller.updateProducer);

router.route("/transportists").get(controller.indexByRole(5));
router.post('/transportists', request.storeTransportist, controller.storeTransportist)
router.put("/transportists/:user_id", request.updateTransportist, controller.updateTransportist);

router.route("/consultants").get(controller.indexByRole(21));
router.post('/consultants', request.storeAdminAndConsultant, controller.storeAdminAndConsultant)


// router.put('/contracts/:user_id', request.updateContract,   controller.updateContract);
router.patch('/status/:user_id', controller.changeStatus)
// TODO: SACAR user_id YA QUE SOLAMENTE PUEDE CAMBIARLO EL USUARIO LOGUEADO
router.patch('/password/:user_id', request.changePassword, controller.changePassword)

router.get('/:user_id/:role_id', controller.show)

// router.post("/", request.store, controller.store);

// router.get('/:role_id', controller.indexByRole)

// router.delete("/:user_id", controller.delete);
// router.put("/:user_id", controller.update);

module.exports = router;
