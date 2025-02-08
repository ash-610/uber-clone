const captainModel = require('../models/captain_model');

module.exports.createCaptain = async ({firstname, lastname, email, password, color, plateNumber, capacity, vehicleType}) => {

    if(!firstname || !email || !password || !color || !plateNumber || !capacity || !vehicleType){
        throw new Error("All fields Required");
    } 

    const captain = captainModel.create(
        {
            fullname: {
                firstname,
                lastname
            },
            email,
            password,
            vehicle: {
                color,
                plateNumber,
                capacity,
                vehicleType
            }
        }
    );

    return captain;
};