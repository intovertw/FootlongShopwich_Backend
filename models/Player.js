const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const playerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters'],
        maxlength: [20, 'Username cannot exceed 20 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match:[/^\S+@\S+.\S+$/,'Please provide a valid email']
    },
    password:{
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must contain at least 8 characters']
    },
    cashEarned: {
        type: Number,
        default: 0,
        min: [0,'You cannot be in debt. (cashEarned cant be below 0)']
    },
    customersServed: {
        type: Number,
        default: 0,
        min: [0, 'Customers served can\'t be 0.']
    }
}, {
    timestamps: true
});

const Player = mongoose.model('Player', playerSchema);
module.exports = Player;