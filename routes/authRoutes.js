const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();


router.post('/auth/signup', authController.signup);
router.post('/auth/login', authController.login);

module.exports = router;