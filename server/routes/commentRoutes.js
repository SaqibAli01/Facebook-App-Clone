import express from "express";
import { verifyLoginUser } from '../middleware/auth.js';
import { addComment, deleteComment, likeComment } from "../controllers/CommentController.js";

const router = express.Router();

router.post("/addComment", verifyLoginUser, addComment);
router.delete("/deleteComment/:commentId", verifyLoginUser, deleteComment);
router.post("/likeComment/:commentId", verifyLoginUser, likeComment);

export default router;