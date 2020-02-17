const express = require('express');

const messagesCTRL = require('../modules/messages/messagesCTRL');

const router = express.Router();

router.post('/create', messagesCTRL.createMessage);
router.put('/update', messagesCTRL.updateMessage);
router.delete('/delete', messagesCTRL.deleteMessage);
router.get('/get-all', messagesCTRL.getAllMessage);
router.get('/get-one/:id', messagesCTRL.getOneMessage);

module.exports = router;
