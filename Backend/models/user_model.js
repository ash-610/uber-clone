const mongooose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');


const userSchema = new mongooose.Schema({
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
    }
    
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id : this._id}, process.env.JWT_SECRET);
    return token;
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;