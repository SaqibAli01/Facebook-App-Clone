import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';


//_____________________________ Create post Post ___________________________________

export const createPost = createAsyncThunk(
    'post/createPost',
    async ({ text, file }) => {
        console.log('text, file', text, file)
        const token = localStorage.getItem("token");
        try {
            const headers = {
                token: token,
                'Content-Type': 'multipart/form-data',
            };

            const formData = new FormData();
            formData.append('text', text);
            formData.append('file', file);

            const response = await axios.post(
                'http://localhost:8000/api/v1/create-post',
                formData,
                { headers }
            );

            console.log("response.data", response.data)
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);


//_____________________________ Get All Post ___________________________________
export const getAllPosts = createAsyncThunk(
    'post/getAllPosts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/getAllPosts');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//_____________________________ Get Single Post ___________________________________

export const getUserPosts = createAsyncThunk(
    'post/getUserPosts',
    async (userId) => {
        console.log("userId", userId)
        const token = localStorage.getItem("token");
        try {
            const headers = {
                token: token,
            };
            const response = await axios.get(`http://localhost:8000/api/v1/user-posts/${userId}`, { headers });
            console.log('response.data single user', response.data)
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    }
);





//_____________________________ Delete Post___________________________________


export const deletePost = createAsyncThunk(
    'post/deletePost',
    async (postId) => {
        const token = localStorage.getItem("token");
        try {
            const headers = {
                token: token,
            };
            const response = await axios.delete(`http://localhost:8000/api/v1/delete/${postId}`, { headers });
            console.log('response.data', response?.data)
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    }
);

//-------------------------------Get Single Post---------------------------------

const backendURL = 'http://localhost:8000/api/v1';

// Create an async thunk to fetch a single post using Axios
export const fetchSinglePost = createAsyncThunk(
    'posts/fetchSinglePost',
    async (postId, { rejectWithValue }) => {
        console.log('postId get', postId)
        const token = localStorage.getItem("token");
        try {
            const headers = {
                token: token,
            };
            const response = await axios.get(`${backendURL}/single-posts/${postId}`, { headers });
            console.log('response.data fetch single post', response?.data)
            return response.data;
        } catch (error) {
            return rejectWithValue({ error: 'Failed to fetch post' });
        }
    }
);










const postSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [], // get all posts
        loading: false,
        error: null,
        singlePost: null,
        // successMessage: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //______________________________Create Post__________________________________

            .addCase(createPost.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = '';
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = action?.payload?.message;
                toast.success(action?.payload?.message);
            })
            .addCase(createPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.message;
                toast.error(action?.error?.message);
            })

            //______________________________Get All Post__________________________________
            .addCase(getAllPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action?.payload;
                // toast.success(action.payload.message);
            })
            .addCase(getAllPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.message;
                // toast.error(action?.error?.message);
            })

            //______________________________Get Single Post______________________________
            .addCase(getUserPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action?.payload;
                toast.success(action?.payload?.message);
            })
            .addCase(getUserPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.message;
                // toast.error(action?.error?.message);
            })


            //________________________Delete Post________________________________________
            .addCase(deletePost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = state.posts.filter((post) => post._id !== action.payload._id);
                toast.success(action?.payload?.message)
                // toast.success(action?.payload?.message || 'Post deleted successfully.');
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.error?.message;
                state.error = action?.payload?.message;
                toast.error(action?.error?.message || "Login failed")
            })

            //____________________ Get Single Post ______________________
            .addCase(fetchSinglePost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSinglePost.fulfilled, (state, action) => {
                state.loading = false;
                state.singlePost = action.payload;
                toast.success(action?.payload?.message)
            })
            .addCase(fetchSinglePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action?.error?.message)
            });
    },
});

export default postSlice.reducer;
