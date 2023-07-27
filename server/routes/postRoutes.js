import express from 'express';
import { upload } from '../middleware/multer.js';
import { verifyLoginUser } from '../middleware/auth.js';
import { createPost, deletePost, getAllPosts, getSinglePost, getUserPosts, sharePost } from '../controllers/postController.js';
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
router.post('/share/:postId', verifyLoginUser, sharePost);
router.get('/single-posts/:postId', verifyLoginUser, getSinglePost);


export default router;
