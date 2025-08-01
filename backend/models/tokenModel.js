import mongoose from "mongoose";

const tokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user",
        unique: true,
    },
    token: {type:String, required: true},
    createdAt: {type:Date, default: Date.now},
    expiresAt: {type:Date, default: Date.now + 3600000},
});

export const Token = mongoose.model("token",tokenSchema);
