import { Comment } from "../models/CommentModel.js";
import { Post } from "../models/PostModel.js";
import User from "../models/userModel.js";

//______________________________ Add Comment __________________________________

export const addComment = async (req, res) => {

    const { text, parentComment, postId } = req.body;
    console.log(' text, parentComment, postId ', req.body)

    const user = await User.findOne({ _id: req?.user?._id });


    const findPost = await Post.findOne({ _id: postId });
    console.log("🚀  findPost:", findPost)

    if (!user || !findPost) {
        return res.status(404).json({ message: "User Or Post Not Found" });
    }

    const comment = await Comment.create({
        text,
        author: req.user?._id,
        parentComment,
        post: postId,
    });

    if (!parentComment) {
        await Post.findByIdAndUpdate(
            {
                _id: postId,
            },
            { $push: { comments: comment._id } }
        );
    } else {
        await Comment.findByIdAndUpdate(
            {
                _id: parentComment,
            },
            {
                $push: { replyComments: comment._id },
            }
        );
    }
    res.status(201).json({
        success: true,
        message: "Comment Added Successfully",
        data: comment,
    });
};

//______________________________ Delete Comment __________________________________
// class CustomError extends Error {
//     constructor(message, status) {
//         super(message);
//         this.name = this.constructor.name;
//         this.status = status || 500;
//     }
// }
export const deleteComment = async (req, res) => {
    const { commentId } = req.params;
    const { user } = req; // Assuming the user object is set in the request during authentication

    try {
        const findComment = await Comment.findById(commentId);

        if (!findComment) {
            return res.status(404).json({
                success: false,
                message: "Comment Not Found",
            });
        }

        // Check if the user making the request is the same user who created the comment
        if (findComment.author.toString() !== user._id.toString()) {
            // If the user is not the same, check if the comment is on the user's post
            const userPost = await Post.findById(findComment.post);

            if (!userPost || userPost.author.toString() !== user._id.toString()) {
                return res.status(401).json({
                    success: false,
                    message: "You are not authorized to delete this comment",
                });
            }
        }

        // Delete all the reply comments and update the post to remove all comments associated with the deleted comment
        await Comment.deleteMany({ _id: { $in: [...findComment.replyComments, commentId] } });

        await Post.updateOne(
            { _id: findComment.post },
            { $pull: { comments: { $in: [...findComment.replyComments, commentId] } } }
        );

        res.status(200).json({
            success: true,
            message: "Comment Deleted Successfully",
            data: findComment,
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Something went wrong",
        });
    }
};




export const likeComment = async (req, res) => {
    // console.log("req", req.params);
    const { commentId } = req.params;
    console.log("commentId", commentId);

    const findUser = await User.findOne({
        _id: req?.user?._id,
    });
    // console.log('findUser', findUser)

    const findComment = await Comment.findOne({
        _id: commentId,
    });
    console.log('findComment', findComment)

    if (!findUser || !findComment) {
        return res.status(404).json({
            success: false,
            message: "User / Comment Not Found ",
        });
    }

    // if already liked
    const alreadyLiked = await Comment.findOne({
        $and: [{ likes: { $in: [findUser._id] } }, { _id: findComment._id }],
    });
    console.log("🚀 alreadyLiked:", alreadyLiked)

    if (alreadyLiked) {
        const disLikeComment = await Comment.findOneAndUpdate(
            { _id: commentId },
            {
                $pull: { likes: findUser._id },
            },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Comment Disliked",
            data: disLikeComment,
        });
    } else {
        const likeComment = await Comment.findOneAndUpdate(
            { _id: commentId },
            {
                $push: { likes: findUser._id },
            },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Comment Liked",
            data: likeComment,
        });
    }
};