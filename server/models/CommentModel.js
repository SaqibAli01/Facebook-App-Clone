import mongoose, { Schema, model } from "mongoose";

const commentSchema = new Schema(
    {
        text: String,
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
        replyComments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
        likes: {
            type: Array,
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

export const Comment = model("Comment", commentSchema);
