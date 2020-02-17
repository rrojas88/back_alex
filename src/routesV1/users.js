const express = require('express');

const usersCTRL = require('../modules/users/usersCTRL');

const router = express.Router();

router.post('/create', usersCTRL.createUser);
router.put('/update', usersCTRL.updateUser);
router.delete('/delete', usersCTRL.deleteUser);
router.get('/get-all', usersCTRL.getAllUser);
router.get('/get-one/:id', usersCTRL.getOneUser);

module.exports = router;