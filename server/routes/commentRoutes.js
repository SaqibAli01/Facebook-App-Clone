import express from "express";
import { verifyLoginUser } from '../middleware/auth.js';
import { addComment, deleteComment, likeComment } from "../controllers/CommentController.js";

const router = express.Router();

router.post("/api/v1/addComment", verifyLoginUser, addComment);
router.delete("/api/v1/deleteComment/:commentId", verifyLoginUser, deleteComment);
router.post("/api/v1/likeComment/:commentId", verifyLoginUser, likeComment);

export default router;