import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

//____________ Add Comment____________
export const addComment = createAsyncThunk(
    'comment/addComment',
    async ({ postId, text }) => {
        // console.log('text, file', text, postId)
        const token = localStorage.getItem("token");

        try {
            const headers = {
                token: token,
            };
            const response = await axios.post(
                'http://localhost:8000/api/v1/addComment',
                { postId, text }, { headers }
            );
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }
);
//____________ Delete Comment____________

export const deleteComment = createAsyncThunk(
    'comment/deleteComment',
    async (commentId) => {
        console.log('commentId', commentId)
        const token = localStorage.getItem("token");

        try {
            const headers = {
                token: token,
            };
            const response = await axios.delete(`http://localhost:8000/api/v1/deleteComment/${commentId}`, { headers });
            console.log('response.data', response?.data)
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    }
);

//_________________Like Comments______________________________
export const likeComments = createAsyncThunk(
    'post/likeComments',
    async (postId) => {
        console.log("postId", postId)
        const token = localStorage.getItem("token");
        try {
            const headers = {
                token: token,
            };
            const response = await axios.post(`http://localhost:8000/api/v1/likeComment/${postId}`, null, { headers });
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    }
);

// Create a comment slice
const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        posts: [],
        loading: false,
        error: null,
        successMessage: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //----------------------------Add Comment-------------------------------
            .addCase(addComment.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = '';
            })


            .addCase(addComment.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = state.posts.map(post => {
                    if (post._id === action.payload._id) {
                        return action.payload;
                    }
                    return post;
                });
                state.successMessage = action.payload.message;
                toast.success(action?.payload?.message);

                // state.loading = false;
                // state.successMessage = action.payload.message;

                // // Find the post in state.posts and update its comments array
                // const { postId, comments } = action.payload;
                // const postIndex = state.posts.findIndex((post) => post._id === postId);
                // if (postIndex !== -1) {
                //     state.posts[postIndex].comments = comments;
                // }

                // toast.success(action?.payload?.message);
            })
            .addCase(addComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.message;
                toast.error(action?.error?.message);
            })

            //------------------------Delete Comment----------------------------------------
            .addCase(deleteComment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.loading = false;
                toast.success(action?.payload?.message);
                // Handle any necessary state updates or data removal
            })
            .addCase(deleteComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                toast.error(action?.error?.message);
            })
            //------------------------likes Comments Comment----------------------------------------

            .addCase(likeComments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(likeComments.fulfilled, (state, action) => {
                state.loading = false;
                const likedPostIndex = state.posts.findIndex(post => post._id === action.payload._id);
                if (likedPostIndex !== -1) {
                    state.posts[likedPostIndex] = action.payload;
                }

                toast.success(action?.payload?.message);
            })
            .addCase(likeComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                toast.error("kindly Login user Id");
                // toast.error(action.error.message);
            });
    },
});


export default commentSlice.reducer;



