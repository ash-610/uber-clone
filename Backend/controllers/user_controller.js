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
