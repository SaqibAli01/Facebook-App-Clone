import { Routes, Route } from "react-router-dom";
import SignUp from "./components/user/SignUp";
import { useEffect, useState } from "react";

//_______________theme_______________
import { responsiveFontSizes } from '@mui/material/styles';
import { Box, Button, CssBaseline, ThemeProvider, } from '@mui/material';
import { createCustomTheme } from './theme';
//_______________ end theme_______________
import Login from "./components/user/Login";
import ForgotPassword from "./components/user/ForgotPassword";
import Message from "./components/user/Message";
import ResetPassword from "./components/user/ResetPassword";
import Navbar from "./components/navbar/Navbar";
import Profile from "./components/user/Profile";
import UpdatePassword from "./components/user/UpdatePassword";
import UserUpdatesInfo from "./components/user/UserUpdatesInfo";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser } from "./ReduxToolKit/userSlice";
import Loading from "./components/Loader/Loading";
import Logout from "./components/user/Logout";
import Home from "./components/Home/Home";
import PostList from "./components/Home/PostList";
import VerificationCode from "./components/user/VerificationCode";
import ReSendVerifyCode from "./components/user/ReSendVerifyCode";



function App() {
  //_______________theme_______________
  const [mode, setMode] = useState(true);
  let theme = createCustomTheme(mode ? "light" : "dark");
  theme = responsiveFontSizes(theme);
  const themeToggler = () => {
    setMode(!mode);
    console.log("mode", mode)
  }
  //_______________theme end_____________



  const data = useSelector((state) => state?.user?.user?.user);
  console.log('data', data?.lastName)
  // console.log("_____________________________________________________________________________")
  // console.log('avatar, email, firstName, lastName, gender,', avatar, email, firstName, lastName, gender,)
  // console.log("_____________________________________________________________________________")

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authenticateUser());
  }, [dispatch]);

  const onClinkHandler = () => {
    setLoading(true);
    dispatch(authenticateUser());
    setLoading(false);

  }


  // _______________Loading State________________
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Loading isLoading={loading} />
      {/* //_______________theme_______________ */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar mode={mode} themeToggler={themeToggler} />
        {/* <NavWeb mode={mode} themeToggler={themeToggler} /> */}
        {/* //_______________end theme_______________ */}


        {/* <ToastContainer /> */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 3

        }}>
          <Button variant="gradient" onClick={onClinkHandler}>Refresh</Button>
          {/* <Button variant="gradient" onClick={onClinkHandlerLogout}>Logout</Button> */}
        </Box>

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/message" element={<Message />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/UserUpdatesInfo" element={<UserUpdatesInfo />} />
          <Route path="/updatePassword" element={<UpdatePassword />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/postList" element={<PostList />} />
          <Route path="/verificationCode" element={<VerificationCode />} />
          <Route path="/reSendVerifyCode" element={<ReSendVerifyCode />} />

        </Routes>



      </ThemeProvider>
    </>
  );
}

export default App;
