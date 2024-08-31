import mongoose, { model, models } from "mongoose";

// Chat Schema to store individual messages in a session
const ChatSchema = new mongoose.Schema({
    sender: { type: String, enum: ['user', 'bot'], required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

// Session Schema to store details of the session
const SessionSchema = new mongoose.Schema({
    chatBot: { type: mongoose.Schema.Types.ObjectId, ref: 'ChatBot', required: true },
    user: { 
        name: {
            type: String,
        },
        email: {
            type: String,
        }
    },
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date },
    chats: [ChatSchema], 
});


const Session = models.Session || model('Session', SessionSchema);

export default Session;