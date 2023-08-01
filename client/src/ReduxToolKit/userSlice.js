import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';


// ______________________Create async thunk for signup________________________________
export const signup = createAsyncThunk('user/signup', async (userData) => {
    try {
        const response = await axios.post('http://localhost:8000/api/v1/signup', userData);
        console.log("response.data", response, userData)
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

// ______________________Create async thunk for verification ________________________________
export const verification = createAsyncThunk('user/verification', async (userData) => {
    console.log("🚀 ~ user Slice:", userData)
    const myData = { "verificationCode": userData }
    try {
        const response = await axios.post('http://localhost:8000/api/v1/verify', myData);
        console.log("response.data", response, userData)
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

// ______________________ Create async thunk for Login ________________________________

export const login = createAsyncThunk('user/login', async (data) => {

    try {
        const response = await axios.post('http://localhost:8000/api/v1/login', data);
        const { token } = response.data
        // console.log('token', token)
        // console.log('user', user)
        // console.log("______________________")
        // console.log('response.data', response.data)
        localStorage.setItem("token", token);
        // Invoke the callback function if it is provided
        if (data.callback && typeof data.callback === 'function') {
            data.callback();
        }

        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

// ______________________ Create async thunk for forgot Password with email __________________

export const forgotPassword = createAsyncThunk(
    'user/forgotPassword',
    async (email) => {
        try {
            const response = await axios.post(
                'http://localhost:8000/api/v1/forgotPassword',
                { email }
            );
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);
// ______________________ Create async thunk for Reset Password __________________


export const resetPassword = createAsyncThunk(
    'user/resetPassword',
    async (data) => {
        const token = window.location.pathname.split('/').pop();

        // console.log('token', token)
        try {
            const response = await axios.post(
                `http://localhost:8000/api/v1/password/reset/${token}`,
                data
            );
            console.log("response.data", response.data)
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

// ______________________ Create async thunk for update Profile __________________

export const updateProfile = createAsyncThunk(
    'user/updateProfile',
    async (userData) => {
        console.log('userData', userData)
        try {
            const token = localStorage.getItem('token');
            const headers = {
                token: token,
                "Content-Type": "multipart/form-data",
            };
            const response = await axios.put('http://localhost:8000/api/v1/updateProfile', { avatar: userData }, { headers });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

// ______________________ Create async thunk for update Profile __________________

export const updatePassword = createAsyncThunk(
    'user/updatePassword',
    async (passwordData, { rejectWithValue }) => {
        console.log('passwordData', passwordData)
        try {
            const token = localStorage.getItem('token');
            const headers = {
                token: token,
            };
            const response = await axios.put(
                'http://localhost:8000/api/v1/update/password',
                passwordData,
                { headers }
            );
            return response.data;
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue({ message: error.message });
        }
    }
);


//_________________________Create async thunk for update User Details __________________
export const updateUserInfo = createAsyncThunk(
    "user/updateUserInfo",
    async (userInfo) => {
        try {
            const token = localStorage.getItem("token");
            const headers = {
                token: token,
                "Content-Type": "application/json",
            };
            const response = await axios.put(
                "http://localhost:8000/api/v1/updateUserInfo",
                userInfo,
                { headers }
            );
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

//_________________________Create async thunk for user verify auth _____________________

export const authenticateUser = createAsyncThunk(
    "user/authenticate",
    async () => {
        try {
            const token = localStorage.getItem("token");
            const headers = {
                token: token,
            };
            const response = await axios.get(
                "http://localhost:8000/api/v1/auth",
                { headers }
            );
            console.log("response.data", response?.data);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

//____________________________Logout________________________
export const logout = createAsyncThunk('user/logout', async () => {
    try {
        const token = localStorage.getItem("token");
        if (token) {
            const headers = {
                token: token,
            };
            const response = await axios.get('http://localhost:8000/api/v1/logout', { headers });
            localStorage.removeItem('token');
            // toast.success("Success User logged out");
            // console.log("response.data", response?.data)
            return response.data;
        }
        else {
            toast.success("User Already logged out");
        }
    } catch (error) {
        throw error.response.data;
    }
});

//____________________________ Resend Verification Code ________________________
export const resendVerificationCode = createAsyncThunk(
    'verification/resendVerificationCode',
    async (email) => {
        console.log('email', email)
        try {

            const response = await axios.post('http://localhost:8000/api/v1/resend-verification', { email });
            console.log('response', response)
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

//_________________________ Send OTP Mobile Number __________________
export const sendOtpNo = createAsyncThunk(
    "user/sendOtpNo",
    async (data) => {
        try {
            const token = localStorage.getItem("token");
            const headers = {
                token: token,
            };
            const response = await axios.post(
                "http://localhost:8000/api/v1/isVerify",
                data,
                { headers }
            );
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

//_________________________ Send OTP Mobile Number __________________
export const reSendOtpNo = createAsyncThunk(
    "user/reSendOtpNo",
    async (data) => {
        console.log('data-------', data)
        try {
            const token = localStorage.getItem("token");
            const headers = {
                token: token,
            };
            const response = await axios.post(
                "http://localhost:8000/api/v1/re-send-Otp",
                data,
                { headers }
            );
            console.log("response.data", response?.data);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);


//___________________________  user slice _______________________________

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        user: null,
        error: null,
        isAuthenticated: false,
        successMessage: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            //________________________ Sign up ___________________________
            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = '';
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.successMessage = action?.payload?.message;
                toast.success(action?.payload?.message);

            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action?.error?.message;
                toast.error(action?.error?.message);
            })

            //________________________ verify code ___________________________
            .addCase(verification.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = '';
            })
            .addCase(verification.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.successMessage = action?.payload?.message;
                toast.success(action?.payload?.message);
            })
            .addCase(verification.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action?.error?.message;
                toast.error(action?.error?.message);
            })

            //________________________ Login ___________________________

            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = '';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.successMessage = action.payload.message;
                toast.success(action?.payload?.message);

            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = action.error.message;
                toast.error(action?.error?.message);
            })

            //_____________ forgot password with email ___________________

            .addCase(forgotPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.loading = false;
                toast.success(action?.payload?.message);
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                toast.error(action?.error?.message);
            })

            //___________________ Reset Password _______________________

            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.loading = false;
                toast.success(action?.payload?.message);
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                toast.error(action?.error?.message);
            })

            //___________________ Update Profile _______________________

            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                toast.success(action?.payload?.message);
                // console.log("action.payload.message", action.payload.message)
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                toast.error(action?.error?.message);
                // console.log("action.error.message", action.error.message)


            })

            //___________________ Update Password _______________________

            .addCase(updatePassword.pending, (state) => {
                state.loading = true;
                state.error = null;
                // state.successMessage = '';
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = action.payload.message;
                console.log('action.payload.message', action.payload.message)
                toast.success(action?.payload?.message);

            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
                console.log('action.error.message', action.error.message)
                toast.error(action?.error?.message);

            })

            //___________________ Update User Details _______________________

            .addCase(updateUserInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = "";
            })
            .addCase(updateUserInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = action?.payload?.message;
                state.user = action?.payload?.user;
                toast.success(action?.payload?.message);
            })
            .addCase(updateUserInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.message;
                toast.error(action?.error?.message);
            })

            //___________________ Update User Details _______________________

            .addCase(authenticateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(authenticateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                toast.success(action?.payload?.message);
            })
            .addCase(authenticateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                toast.error(action?.error?.message);
            })
            //___________________ Update User Details _______________________

            .addCase(logout.pending, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.user = null;
                state.loading = false;
                state.user = action?.payload;
                toast.success(action?.payload?.message);

            })
            .addCase(logout.rejected, (state, action) => {
                // state.loading = false;
                // state.error = action.error.message;
                // toast.error(action?.error?.message);
            })

            //___________________ Re Send VerificationCode _______________________

            .addCase(resendVerificationCode.pending, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(resendVerificationCode.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                toast.success(action?.payload?.message);
            })
            .addCase(resendVerificationCode.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.error?.message;
                toast.error(action?.error?.message);

            })

            //___________________ Send VerificationCode Phone No _______________________

            .addCase(sendOtpNo.pending, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(sendOtpNo.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                toast.success(action?.payload?.message);
            })
            .addCase(sendOtpNo.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.error?.message;
                toast.error(action?.error?.message);
            })

            //___________________ Re Send VerificationCode Phone No _____________________

            .addCase(reSendOtpNo.pending, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(reSendOtpNo.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                toast.success(action?.payload?.message);
            })
            .addCase(reSendOtpNo.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.error?.message;
                toast.error(action?.error?.message);
            });





    },
});

export default userSlice.reducer;
