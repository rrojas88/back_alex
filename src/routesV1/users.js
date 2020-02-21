const express = require('express');

const { 
  validateHostname, 
  validateApp, 
  validateAppDeviceAlex,
  //isAuth 
} = require('../middlewares/auth');

const usersCTRL = require('../modules/users/usersCTRL');

const router = express.Router();

router.post('/create', validateAppDeviceAlex, usersCTRL.createUser);
router.post('/update', validateHostname, usersCTRL.updateUser);
router.post('/delete', validateHostname, usersCTRL.deleteUser);
router.get('/get-all', validateHostname, usersCTRL.getAllUser);
router.get('/get-one/:id', validateHostname, usersCTRL.getOneUser);
router.post('/login', validateApp, usersCTRL.login);

module.exports = router;