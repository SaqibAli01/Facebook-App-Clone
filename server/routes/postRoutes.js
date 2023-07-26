import express from 'express';
import { upload } from '../middleware/multer.js';
import { verifyLoginUser } from '../middleware/auth.js';
import { createPost, deletePost, getAllPosts, getUserPosts } from '../controllers/postController.js';
// import { createPost, getAllPosts } from '../controllers/PostController.js';

const router = express.Router();


router.post(
    "/create-post",
    verifyLoginUser,
    upload.single("file"),
    createPost
);
router.get("/getAllPosts", getAllPosts);
router.get("/user-posts/:userId", verifyLoginUser, getUserPosts);
router.delete("/delete/:postId", verifyLoginUser, deletePost);


export default router;
