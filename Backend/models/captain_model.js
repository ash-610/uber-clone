const mongoose = require('mongoose');

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'Atleast 3 characters required']
        },
        lastname: {
            type: String,
            minlength: [3, 'Atleast 3 characters required']
        }        
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: [5, 'Atleast 5 characters required']
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, 'Atleast 3 characters required']
        },
        plateNumber: {
            type: String,
            required: true,
            minlength: [3, 'Atleast 3 characters required']
        },
        capacity: {
            type: Number,
            required: true,
            minlength: [1, 'Atleast 1 characters required']
        },
        vehicleType: {
            type: String,
            enum: ['car', 'motorcycle', 'auto'],
            required: true
        }
    }
})

captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: '24h'});
    return token;
};
captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
};
captainSchema.pre('save', async function (next){
    const salt = bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const captainModel = mongoose.model('captain', captainSchema);

module.exports = captainModel;