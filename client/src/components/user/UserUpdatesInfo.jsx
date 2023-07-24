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
  Radio,
  RadioGroup,
  FormControlLabel,
  Container,
} from "@mui/material";
import { authenticateUser, updateUserInfo } from "../../ReduxToolKit/userSlice";
import Loading from "../Loader/Loading";

// import { useNavigate } from "react-router-dom";

const UserUpdatesInfo = ({ handleClose3 }) => {
  // const navigate = useNavigate();

  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { loadings, error, successMessage } = useSelector(
    (state) => state.user
  );

  const onSubmit = async (data) => {
    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }
    setLoading(true);
    console.log("formData", data);

    dispatch(updateUserInfo(formData));
    // const response = await dispatch(updateUserInfo(formData));
    handleClose3();
    setTimeout(() => {
      dispatch(authenticateUser());

      setLoading(false);
    }, 3000);

    // if (response.payload) {
    //   navigate("/profile");
    // }
  };

  // _______________Loading State________________
  const [loading, setLoading] = useState(false);

  // _______________Loading State________________
  // const theme = useTheme();
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
            }}
          >
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

            <Box mt={2}>
              <Button type="submit" disabled={loadings} variant="gradient">
                Update User
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

export default UserUpdatesInfo;
