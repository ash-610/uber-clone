const router = require('express').Router();
const { body } = require('express-validator');
const captainController = require('../controllers/captain_controller');


router.post('/register', async (req, res, next) => {
    body('firstname').isLength({ min: 3 }).withMessage('Atleast 3 characters required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Atleast 6 characters required'),
    body('color').isLength({ min: 3 }).withMessage('Atleast 3 characters required'),
    body('plateNumber').isLength({ min: 3 }).withMessage('Atleast 3 characters required'),
    body('capacity').isLength({ min: 1 }).withMessage('Atleast 1 characters required'),
    body('vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle type')
}, captainController.registerCaptain);

module.exports = router;