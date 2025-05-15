import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User's  Name is required"],
        trim: true,
        minLength: 2,
        maxLength: 50,
    },
    email: {
        type: String,
        required: [true, "User's email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function (value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Invalid email format',
        },
    },
    password: {
        type: String,
        required: [true, "User's password is required"],
        minLength: 6,
    }
}, { timestamps: true });


const user = mongoose.model("User", userSchema);


export default user