import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: { type: String, required: true, minlength: 3 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    profileAvatar: { type: String, required: true },
    todos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'todo',
        },
    ],
}, { timestamps: true });

const userModel = mongoose.model('user', userSchema);

export default userModel;