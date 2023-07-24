import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import postReducer from './postSlice';
import likeReducer from './PostLikes';
import commentSlice from './commentSlice';


const store = configureStore({
    reducer: {
        user: userReducer,
        post: postReducer,
        like: likeReducer,
        comment: commentSlice,

    },
});

export default store;
