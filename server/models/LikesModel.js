import { Schema, model } from "mongoose";

const likeSchema = new Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },


    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Like = model("Like", likeSchema);
