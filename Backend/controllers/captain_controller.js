const captainModel = require('../models/captain_model');
const {validationResult} = require('express-validator');
const captainServices = require('../services/captain_services');
const BlacklistToken = require('../models/blacklistToken_model');

module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty){
        return res.status(400).json({errors: errors.array()});
    }

    const {firstname, lastname, email, password, color, plateNumber, capacity, vehicleType} = req.body;

    const captainExists = await captainModel.findOne({email});
    if(captainExists){
        return res.status(400).json({error: "Captain already exists"});
    }

    try{
        const captain = await captainServices.createCaptain({
            firstname,
            lastname,
            email,
            password,
            color,
            plateNumber,
            capacity,
            vehicleType
        });
    }
    catch(err){
        return res.status(400).json({error: err.message});
    }

    return res.status(201).json({message: "Captain registered successfully"});
}


module.exports.loginCaptain = async (req, res, next) => {

    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    
    const {email, password} = req.body;

    const captain = await captainModel.findOne({email}).select('+password');

    if(captain){
        const isMatch = await captain.comparePassword(password);

        if(!isMatch){
            return res.status(400).json({error: "Invalid password"});
        }
        
        const token = captain.generateAuthToken();
        res.cookie('captain_token', token, {
            maxAge: 24*60*60*1000,
            httpOnly: true,
            secure: true
        });

        return res.status(200).json({token, captain});
    }
    else{
        return res.status(400).json({error: "Captain does not exist"});
    }
}


module.exports.getCaptainProfile = async (req, res, next) => {
    return res.status(200).json(req.captain);
}


module.exports.logoutCaptain = async (req, res, next) => {

    const token = req.cookies.captain_token || req.headers.authentication?.split(' ')[1];

    if(token){
        await BlacklistToken.create({token});
    }

    res.clearCookie('captain_token');
    res.status(200).json({message: "Logged out successfully"});

}
