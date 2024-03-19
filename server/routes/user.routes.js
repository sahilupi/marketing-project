const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const jwtHelper = require('../config/jwtHelper');

router.post('/register-user', ctrlUser.postRegisterUser);
router.post('/authenticate', ctrlUser.authenticate);
router.post('/authenticate-admin', ctrlUser.authenticateAdmin);
router.get('/get-user-profile',jwtHelper.verifyJwtToken, ctrlUser.getUserProfile);
router.patch('/update-user-profile', jwtHelper.verifyJwtToken, ctrlUser.patchUpdateUserProfile);
router.put('/change-password', jwtHelper.verifyJwtToken, ctrlUser.putChangePassword);
// password reset
router.post('/req-reset-password', ctrlUser.resetPassword);
router.post('/new-password', ctrlUser.newPassword);
router.post('/valid-password-token', ctrlUser.validatePasswordToken);

module.exports = router;