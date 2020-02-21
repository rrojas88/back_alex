const express = require('express');

const { 
  validateHostname, 
  validateApp, 
  validateAppDeviceAlex,
  isAuth,
  validateDevice
} = require('../middlewares/auth');

const messagesCTRL = require('../modules/messages/messagesCTRL');

const router = express.Router();

router.post('/create', validateAppDeviceAlex, messagesCTRL.createMessage);
router.post('/update', validateApp, isAuth, validateDevice, messagesCTRL.updateMessage);
router.post('/get-all-my', validateApp, isAuth, validateDevice, messagesCTRL.getAllMyMessages);
router.post('/delete', validateHostname, messagesCTRL.deleteMessage);
router.get('/get-all', validateHostname, messagesCTRL.getAllMessage);
router.get('/get-one/:id', validateHostname, messagesCTRL.getOneMessage);

module.exports = router;
