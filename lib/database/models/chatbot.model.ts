import mongoose, { model, models } from "mongoose";


const ChatBotSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    color: {type: String},
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    predefinedInformation: { type: String },
    sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Session' }],
});

const ChatBot = models.ChatBot || model('ChatBot', ChatBotSchema);

export default ChatBot;