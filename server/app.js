import express from "express";
import cors from 'cors';
import path from "path";
import user from './routes/userRoutes.js';
import post from './routes/postRoutes.js';
import comments from './routes/commentRoutes.js';
import likes from './routes/likeRoutes.js';

const app = express()
app.use(cors());
app.use(express.json());

// Routes
app.use(user);
app.use(post);
app.use(comments);
app.use(likes);

//multer //image frontend
app.use("/uploads", express.static("uploads"));


//frontend connect 
app.use(express.static(path.join(path.resolve(), "static")));


//frontend connect 
// app.use(express.static(path.join(path.resolve(), "build")));

// app.get("/*", (req, res) => {
//     res.status(200).sendFile(path.join(path.resolve(), "build/index.html"));
// });



export default app;
