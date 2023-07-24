import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6, // Example: set a minimum password length of 6 characters
    },
    dob: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other'], // Example: limit gender options to a specific set
    },
    avatar: {
        type: String,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    verificationCode: {
        type: String,
        default: null, // Initially set to null as no verification code is generated yet
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

const User = mongoose.model('User', userSchema);

export default User;

