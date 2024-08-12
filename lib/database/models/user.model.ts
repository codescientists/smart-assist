import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    clerkId: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    bots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bot' }],   
})

const User = models.User || model('User', UserSchema);

export default User;