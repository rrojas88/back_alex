const express = require('express');

const { validateHostname, isAuth } = require('../middlewares/auth');

const usersCTRL = require('../modules/users/usersCTRL');

const router = express.Router();

router.post('/create', usersCTRL.createUser);
router.post('/update', usersCTRL.updateUser);
router.post('/delete', validateHostname, isAuth, usersCTRL.deleteUser);
router.get('/get-all', usersCTRL.getAllUser);
router.get('/get-one/:id', usersCTRL.getOneUser);
router.post('/login', usersCTRL.login);

module.exports = router;