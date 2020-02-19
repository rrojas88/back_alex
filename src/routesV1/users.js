const express = require('express');

const usersCTRL = require('../modules/users/usersCTRL');

const router = express.Router();

router.post('/create', usersCTRL.createUser);
router.post('/update', usersCTRL.updateUser);
router.post('/delete', usersCTRL.deleteUser);
router.get('/get-all', usersCTRL.getAllUser);
router.get('/get-one/:id', usersCTRL.getOneUser);

module.exports = router;