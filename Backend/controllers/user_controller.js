const { validationResult } = require('express-validator')
const userModel = require('../models/user_model');
const { createUser } = require('../services/user_services');

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const {firstname, lastname, email, password} = req.body;

    const user = await createUser({
        firstname,
        lastname,
        email,
        password
    })

    res.status(200).json({user});
}


module.exports.loginUser = async (req, res, next) => {
    
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    const {email, password} = req.body;

    const user = await userModel.findOne({
        email : email
    },).select('+password');

    if(user){
        const isMatch = await user.comparePassword(password);

        if(isMatch){

            const token = user.generateAuthToken();
            res.status(200).json({user, token});
        }
        else{
            res.status(400).json({message: 'Wrong Password'})
        }
    }
    else{
        return res.status(400).json({message: 'Invalid email'});
    }
}