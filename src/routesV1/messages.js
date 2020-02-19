const express = require('express');

const messagesCTRL = require('../modules/messages/messagesCTRL');

const router = express.Router();

router.post('/create', messagesCTRL.createMessage);
router.post('/update', messagesCTRL.updateMessage);
router.post('/delete', messagesCTRL.deleteMessage);
router.get('/get-all', messagesCTRL.getAllMessage);
router.get('/get-one/:id', messagesCTRL.getOneMessage);

module.exports = router;
