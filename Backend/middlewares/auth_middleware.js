const jwt = require('jsonwebtoken');
const userModel = require('../models/user_model');
const BlacklistToken = require('../models/blacklistToken_model');


module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({message: 'Unauthorized'});
    }

    const isBlacklisted = await BlacklistToken.findOne({token: token});

    if(isBlacklisted){
        return res.status(401).json({message: 'Unauthorized!'});
    }

    try{
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        req.user = user;

        return next();

    }
    catch(err){
        res.status(401).json({message: 'Unauthorized User'});
    }
}