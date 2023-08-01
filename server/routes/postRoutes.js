import express from 'express';
import { upload } from '../middleware/multer.js';
import { verifyLoginUser } from '../middleware/auth.js';
import { createPost, deletePost, getAllPosts, getSinglePost, getUserPosts, sharePost } from '../controllers/postController.js';
// import { createPost, getAllPosts } from '../controllers/PostController.js';

const router = express.Router();


router.post(
    "/api/v1/create-post",
    verifyLoginUser,
    upload.single("file"),
    createPost
);
router.get("/api/v1/getAllPosts", getAllPosts);
router.get("/api/v1/user-posts/:userId", verifyLoginUser, getUserPosts);
router.delete("/api/v1/delete/:postId", verifyLoginUser, deletePost);
router.post('/api/v1/share/:postId', verifyLoginUser, sharePost);
router.get('/api/v1/single-posts/:postId', verifyLoginUser, getSinglePost);


export default router;
