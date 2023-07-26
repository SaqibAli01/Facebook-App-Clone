import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  CircularProgress,
  Typography,
  Box,
  FormControl,
  InputAdornment,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  Container,
  Avatar,
  useTheme,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { signup } from "../../ReduxToolKit/userSlice";
import Loading from "../Loader/Loading";

import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { loadings, error, successMessage } = useSelector(
    (state) => state.user
  );
  const [showPassword, setShowPassword] = useState(false);

  const [userData, setUserData] = useState();
  const [showImage, setShowImage] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUserData(file);

    //img show
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setShowImage(reader.result);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("avatar", userData);
    for (const key in data) {
      formData.append(key, data[key]);
    }
    setLoading(true);
    console.log("formData", data);

    // dispatch(signup(formData));
    const response = await dispatch(signup(formData));
    setLoading(false);
    const reSendEmail = response?.payload?.email;
    console.log("response.payload", reSendEmail);

    if (response.payload) {
      // navigate("/verificationCode");
      navigate("/verificationCode", { state: { reSendEmail } });
      // Pass reSendEmail as state to the next route
    }
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // _______________Loading State________________
  const [loading, setLoading] = useState(false);

  // _______________Loading State________________
  const theme = useTheme();
  return (
    <>
      <Loading isLoading={loading} />

      <Container sx={{ my: 2 }}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              //   alignItems: "center",
              flexDirection: "column",
              width: { md: "60%", sm: "70%", xs: "100%" },

              boxShadow: theme.palette.background.boxShadow,

              p: 4,
            }}
          >
            <Box>
              <Avatar
                src={showImage}
                sx={{ width: 100, height: 100, my: 2, m: "auto" }}
              />
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Controller
                name="firstName"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="First Name"
                    placeholder="First Name"
                    fullWidth
                    margin="normal"
                    error={errors.firstName}
                    helperText={errors.firstName && "First Name is required"}
                  />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Last Name"
                    placeholder="Last Name"
                    fullWidth
                    margin="normal"
                    error={errors.lastName}
                    helperText={errors.lastName && "Last Name is required"}
                  />
                )}
              />
            </Box>

            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="email"
                  label="Email"
                  placeholder="Email"
                  fullWidth
                  margin="normal"
                  error={errors.email}
                  helperText={errors.email && "Email is required"}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <FormControl fullWidth margin="normal" error={errors.password}>
                  <TextField
                    {...field}
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    placeholder="Password"
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleTogglePassword}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {errors.password && (
                    <Typography
                      variant="caption"
                      sx={{
                        color: "red",
                      }}
                    >
                      Password is required
                    </Typography>
                  )}
                </FormControl>
              )}
            />
            <Controller
              name="dob"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="date"
                  label="Date of Birth"
                  placeholder="Date of Birth"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={errors.dob}
                  helperText={errors.dob && "Date of Birth is required"}
                />
              )}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                // justifyContent: "space-around",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  mt: 1,
                }}
              >
                Gender
              </Typography>
              <Controller
                name="gender"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <FormControl
                    component="fieldset"
                    margin="normal"
                    error={errors.gender}
                  >
                    <RadioGroup
                      {...field}
                      row
                      defaultValue=""
                      aria-label="Gender"
                    >
                      <FormControlLabel
                        value="Female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="Male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="Custom"
                        control={<Radio />}
                        label="Custom"
                      />
                    </RadioGroup>

                    {errors.gender && (
                      <Typography variant="caption" style={{ color: "red" }}>
                        Gender is required
                      </Typography>
                    )}
                  </FormControl>
                )}
              />
            </Box>
            <input type="file" name="avatar" onChange={handleFileChange} />
            <Box mt={2}>
              <Button type="submit" disabled={loadings} variant="gradient">
                Sign Up
              </Button>
            </Box>
            {loadings && (
              <Box mt={2} display="flex" alignItems="center">
                <CircularProgress size={24} />
                <Typography variant="body2" ml={2}>
                  Loading...
                </Typography>
              </Box>
            )}
            {error && (
              <Typography variant="body2" color="error" mt={2}>
                Error: {error}
              </Typography>
            )}
            {successMessage && (
              <Typography variant="body2" color="success" mt={2}>
                {successMessage}
                {/* {navigate("/login")} */}
              </Typography>
            )}
          </Box>
        </form>
      </Container>
    </>
  );
};

export default SignUp;
