const captainModel = require('../models/captain_model');
const {validationResult} = require('express-validator');
const captainServices = require('../services/captain_services');

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