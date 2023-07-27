import React, { useEffect, useState } from "react";
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

const UserUpdatesInfo = ({ handleClose3 }) => {
  const dispatch = useDispatch();
  const [loadings, setLoading] = useState(false);

  const { handleSubmit, control, formState, reset } = useForm({
    defaultValues: {
      firstName: "", // Set your default values here
      lastName: "",
      dob: "",
      gender: "",
    },
  });

  const { errors } = formState;

  const { user, loading, error, successMessage } = useSelector(
    (state) => state?.user?.user
  );

  useEffect(() => {
    if (user) {
      // Reset the form fields when user data changes
      reset({
        firstName: user?.firstName,
        lastName: user?.lastName,
        dob: formatDate(user?.dob), // Format the dob before setting it
        gender: user?.gender,
      });
    }
  }, [user, reset]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Format the date as "YYYY-MM-DD"
  };

  const onSubmit = async (data) => {
    setLoading(true);

    // Submit the form data to the server
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    dispatch(updateUserInfo(formData));

    // Close the dialog after form submission
    handleClose3();

    // Reset the loading state after a delay
    setTimeout(() => {
      dispatch(authenticateUser());
      setLoading(false);
    }, 3000);
  };

  if (loading) {
    return <h1>Loading .....</h1>;
  }

  return (
    <>
      <Loading isLoading={loadings} />
      <Container sx={{ my: 2 }}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Box sx={{ display: "flex", gap: 2 }}>
              <Controller
                name="firstName"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="First Name"
                    placeholder="First Name"
                    fullWidth
                    margin="normal"
                    error={!!errors.firstName}
                    helperText={errors.firstName && "First Name is required"}
                  />
                )}
              />

              <Controller
                name="lastName"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Last Name"
                    placeholder="Last Name"
                    fullWidth
                    margin="normal"
                    error={!!errors.lastName}
                    helperText={errors.lastName && "Last Name is required"}
                  />
                )}
              />
            </Box>

            <Controller
              name="dob"
              control={control}
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
                  error={!!errors.dob}
                  helperText={errors.dob && "Date of Birth is required"}
                />
              )}
            />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 4,
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
                rules={{ required: true }}
                render={({ field }) => (
                  <FormControl
                    component="fieldset"
                    margin="normal"
                    error={!!errors.gender}
                  >
                    <RadioGroup {...field} row aria-label="Gender">
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
              </Typography>
            )}
          </Box>
        </form>
      </Container>
    </>
  );
};

export default UserUpdatesInfo;
