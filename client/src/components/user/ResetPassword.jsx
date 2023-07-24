import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Loading from "../Loader/Loading";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../ReduxToolKit/userSlice";

const ResetPassword = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data) => {
    console.log("data---------", data);
    setLoading(true);
    // dispatch(resetPassword(data));
    const response = await dispatch(resetPassword(data));
    console.log("response front end", response);
    setLoading(false);
    if (response.payload) {
      navigate("/login");
    }
    setLoading(false);
  };
  // const passwordWatch = watch("password", "");

  // _______________Loading State________________
  const [loading, setLoading] = useState(false);

  // _______________Loading State________________
  return (
    <>
      <Loading isLoading={loading} />

      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            mt: 6,
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                boxShadow: theme.palette.background.boxShadow,
                p: { md: 10, sm: 6, xs: 3 },
                width: { md: "100%", sm: "100%", xs: "100%" },
              }}
            >
              <Typography variant="h3">Reset Password</Typography>
              <Box mt={2}>
                <TextField
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                  sx={{
                    width: "100%",
                  }}
                />
                <br />
                {errors.password && (
                  <span style={{ color: "red" }}>
                    {errors.password.message}
                  </span>
                )}
              </Box>
              <Box mt={2}>
                <TextField
                  type={showConfirmPassword ? "text" : "password"}
                  label="Confirm Password"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    ),
                  }}
                  sx={{
                    width: "100%",
                  }}
                />
                <br />
                {errors.confirmPassword && (
                  <span style={{ color: "red" }}>
                    {errors.confirmPassword.message}
                  </span>
                )}
              </Box>
              <Box mt={2}>
                <Button
                  type="submit"
                  variant="gradient"
                  sx={{
                    width: "100%",
                  }}
                >
                  Reset Password
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default ResetPassword;
