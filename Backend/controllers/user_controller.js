const { validationResult } = require('express-validator')
const userModel = require('../models/user_model');
const { createUser } = require('../services/user_services');
const blacklistToken = require('../models/blacklistToken_model');

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const {firstname, lastname, email, password} = req.body;

    const userExist = await userModel.findOne({email});
    if(userExist){
        return res.status(400).json({message: 'User already exists'});
    }

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
    }).select('+password');

    if(user){
        const isMatch = await user.comparePassword(password);

        if(isMatch){

            const token = user.generateAuthToken();

            res.cookie('user_token', token, {
                maxAge: 24*60*60*1000,
                httpOnly: true,
                secure: true,
            })

            res.status(200).json({token, user});
        }
        else{
            res.status(400).json({message: 'Wrong Password'})
        }
    }
    else{
        return res.status(400).json({message: 'Invalid email'});
    }
}


module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user);
}


module.exports.logoutUser = async (req, res, next) => {

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(token){
        await blacklistToken.create({
            token: token
        })
    }
    res.clearCookie('token');
    res.status(200).json({message: 'Logged Out Successfully'});
}
