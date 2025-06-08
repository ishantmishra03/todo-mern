import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: { type: String, required: true, min: 3 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 6 },
    profileAvatar: { type: String, required: true }
}, { timestamps: true });

const userModel = mongoose.model('user', userSchema);

export default userModel;