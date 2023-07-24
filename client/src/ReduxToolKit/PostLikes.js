import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

export const likePost = createAsyncThunk(
    'post/likePost',
    async (postId) => {
        console.log("postId", postId)
        const token = localStorage.getItem("token");
        try {
            const headers = {
                token: token,
            };
            const response = await axios.post(`http://localhost:8000/api/v1/postLike/${postId}`, null, { headers });
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    }
);


const postLikeSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
        loading: false,
        error: null,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(likePost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(likePost.fulfilled, (state, action) => {
                state.loading = false;
                const likedPostIndex = state.posts.findIndex(post => post._id === action.payload._id);
                if (likedPostIndex !== -1) {
                    state.posts[likedPostIndex] = action.payload;
                }

                toast.success(action?.payload?.message);
            })
            .addCase(likePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                toast.error("kindly Login user Id");
                // toast.error(action.error.message);
            });
    },
});



export default postLikeSlice.reducer;
