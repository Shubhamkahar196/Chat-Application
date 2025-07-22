import mongoose  from "mongoose";

const messageSchema = new Schema({
    sender: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
    recipient: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
    text: {type: String, required: true}
},{timestamps: true});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;