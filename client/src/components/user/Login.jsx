import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../ReduxToolKit/userSlice";
import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  InputAdornment,
  Typography,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Loading from "../Loader/Loading";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState();
  const [imgAvatar, setImgAvatar] = useState();

  const { user, loadings, error, successMessage } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (user && user.user) {
      setName(user.user.firstName);
      setImgAvatar(user.user.avatar);
      //   console.log("User name:", name);
      //   console.log("imgAvatar:", imgAvatar);
    }
  }, [user]);
  //   successMessage && navigate("/");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  //   const callback = () => {
  //     alert("data");
  //   };
  //   const onSubmit = (data) => {
  //     setLoading(true);
  //     dispatch(login(data));
  //     setLoading(false);
  //   };

  const onSubmit = async (data) => {
    setLoading(true);
    const response = await dispatch(login(data));
    setLoading(false);
    if (response.payload) {
      navigate("/");
    }
  };

  const passwordWatch = watch("password", "");
  //   console.log("passwordWatch", passwordWatch);

  // _______________Loading State________________
  const [loading, setLoading] = useState(false);

  // _______________Loading State________________

  const theme = useTheme();
  return (
    <>
      <Loading isLoading={loading} />

      <Container
        sx={{
          mt: 6,
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              boxShadow: theme.palette.background.boxShadow,
              width: { md: "50%", sm: "70%", xs: "100%" },
              p: 3,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                textAlign: "center",
              }}
            >
              Login
            </Typography>
            <Box
              sx={{
                py: 2,
              }}
            >
              <TextField
                type="email"
                label="Email"
                {...register("email", { required: "Email is required" })}
                sx={{
                  width: "100%",
                }}
              />
              <br />
              {errors.email && (
                <span style={{ color: "red" }}>{errors.email.message}</span>
              )}
            </Box>

            <Box
              sx={{
                py: 2,
              }}
            >
              <TextField
                type={showPassword ? "text" : "password"}
                label="Password"
                {...register("password", { required: "Password is required" })}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  width: "100%",
                }}
              />
              <br />
              {errors.password && (
                <span style={{ color: "red" }}>{errors.password.message}</span>
              )}
            </Box>
            <Box
              sx={{
                textAlign: "right",
              }}
            >
              <Link to="/forgot-password">
                <span style={{ textDecoration: "none" }}>Forgot Password?</span>
              </Link>
            </Box>

            <Button
              type="submit"
              variant="gradient"
              disabled={loadings}
              sx={{
                width: "100px",
              }}
            >
              Login
            </Button>
            {loadings && (
              <Box mt={2} display="flex" alignItems="center">
                <CircularProgress size={24} />
                <Typography variant="body2" ml={2}>
                  Loading...
                </Typography>
              </Box>
            )}
            {loadings && (
              <Box mt={2} display="flex" alignItems="center">
                <CircularProgress size={24} />
                <Typography variant="body2" ml={2}>
                  Loading...
                </Typography>
              </Box>
            )}
            {/* {error && (
              <Typography variant="body2" color="error" mt={2}>
                Error: {error}
              </Typography>
            )}
            {successMessage && (
              <Typography variant="body2" color="success" mt={2}>
                {successMessage}
                {navigate("/")}
              </Typography>
            )} */}
          </Box>
        </form>
      </Container>
    </>
  );
};

export default Login;
