import { Schema, model } from "mongoose";

const postSchema = new Schema({
    // text: { type: String, required: true },
    text: { type: String },
    file: { type: String },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    shared: { type: Boolean, default: false },
    // New field for indicating if the post has been shared

});

export const Post = model("Post", postSchema);
