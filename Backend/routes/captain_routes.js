const router = require('express').Router();
const { body } = require('express-validator');
const captainController = require('../controllers/captain_controller');
const authMiddleware = require('../middlewares/auth_middleware');


router.post('/register', [
    body('firstname').isLength({ min: 3 }).withMessage('Atleast 3 characters required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Atleast 6 characters required'),
    body('color').isLength({ min: 3 }).withMessage('Atleast 3 characters required'),
    body('plateNumber').isLength({ min: 3 }).withMessage('Atleast 3 characters required'),
    body('capacity').isLength({ min: 1 }).withMessage('Atleast 1 characters required'),
    body('vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle type')
], captainController.registerCaptain);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Atleast 6 characters required')
], captainController.loginCaptain);

router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile);

router.get('/logout', captainController.logoutCaptain);


module.exports = router;