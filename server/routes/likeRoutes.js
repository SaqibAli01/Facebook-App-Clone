import express from "express";
import { verifyLoginUser } from '../middleware/auth.js';

import postLikes from "../controllers/likeController.js";

const router = express.Router();

router.post("/postLike/:postId", verifyLoginUser, postLikes);

export default router;
