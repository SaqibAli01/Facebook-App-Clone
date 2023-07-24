import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../ReduxToolKit/userSlice";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Loading from "../Loader/Loading";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("data.email", data.email);

    // dispatch(forgotPassword(data.email));
    setLoading(false);

    setLoading(true);
    const response = await dispatch(forgotPassword(data.email));
    if (response.payload) {
      navigate("/message");
    }
    setLoading(false);
  };
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
            width: "100%",
            // boxShadow: theme.palette.background.boxShadow,
            // width: { md: "60%", sm: "70%", xs: "100%" },
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
                p: { md: 10, sm: 6, xs: 3 },
                width: { md: "100%", sm: "100%", xs: "100%" },
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  pb: 2,
                }}
              >
                Forgot Password
              </Typography>
              <Box mt={2}>
                <TextField
                  type="email"
                  label="Email"
                  {...register("email", { required: "Email is required" })}
                  sx={{
                    width: "100%",
                    pb: 2,
                  }}
                />
                <br />
                {errors.email && (
                  <span style={{ color: "red" }}>{errors.email.message}</span>
                )}
              </Box>
              <Box mt={2}>
                <Button
                  type="submit"
                  variant="gradient"
                  // disabled={loadings}
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

export default ForgotPassword;
