import { Schema, model } from "mongoose";

const postSchema = new Schema({
    text: { type: String, required: true },
    file: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Post = model("Post", postSchema);
