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
import {
  authenticateUser,
  reSendOtpNo,
  sendOtpNo,
  updateUserInfo,
} from "../../ReduxToolKit/userSlice";
import Loading from "../Loader/Loading";

const UserUpdatesInfo = ({ handleClose3 }) => {
  const dispatch = useDispatch();
  const [loadings, setLoading] = useState(false);
  const [show, setVerify] = useState();
  console.log("show", show);

  const [otp, setOtp] = useState("");

  const [reEmail, setreSendEmail] = useState();
  const [phoneNo, setPhoneNo] = useState();

  const { handleSubmit, control, formState, reset } = useForm({
    defaultValues: {
      firstName: "", // Set your default values here
      lastName: "",
      dob: "",
      email: "",
      phoneNumber: "",
      gender: "",
    },
  });

  const { errors } = formState;

  const { user, loading, error, successMessage } = useSelector(
    (state) => state?.user?.user
  );
  console.log("user", user);

  useEffect(() => {
    if (user) {
      setreSendEmail(user?.email);
      setPhoneNo(user?.phoneNumber);
      setVerify(user?.isVerified);
      reset({
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
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

  //----------------------------Timer------------------------------------
  const [seconds, setSeconds] = useState(60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [resendButtonEnabled, setResendButtonEnabled] = useState(true);

  useEffect(() => {
    let timer;

    if (timerRunning && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    if (seconds === 0) {
      setTimerRunning(false);
    }

    return () => clearInterval(timer);
  }, [seconds, timerRunning]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleStartTimer = () => {
    if (!timerRunning && resendButtonEnabled) {
      setTimerRunning(true);
      setResendButtonEnabled(false);
      setSeconds(60); // Reset the timer to 60 seconds
      setTimeout(() => {
        setResendButtonEnabled(true); // Enable the button after one minute
      }, 60000); // 60,000 milliseconds = 1 minute
    }
  };

  //----------------------------------------------------------------
  const isButtonDisabled = otp.length !== 6;
  const handleOtpChange = (event) => {
    const inputOtp = event.target.value.replace(/\D/g, ""); // Allow only digits
    if (inputOtp.length <= 6) {
      setOtp(inputOtp);
    }
  };
  const verifyNumberHandler = async () => {
    console.log("otp", otp);
    const formData = new FormData();
    formData.append("isVerificationCode", otp);
    const data = {
      isVerificationCode: otp,
    };

    const response = await dispatch(sendOtpNo(data));
    handleClose3();
    if (response.payload) {
      setTimeout(() => {
        handleClose3();
      }, 30000);
    }
  };

  const handResendVerifyCode = async () => {
    console.log("phoneNo", phoneNo);
    const formData = new FormData();
    formData.append("email", reEmail);
    formData.append("phoneNumber", phoneNo);
    const data = {
      phoneNumber: phoneNo,
      email: reEmail,
    };
    const response = await dispatch(reSendOtpNo(data));

    if (response.payload) {
      handleStartTimer();
      // navigate("/verificationCode");
    }
    setLoading(false);
    setTimeout(() => {
      handleClose3();
    }, 60000);
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

            <Box sx={{ display: "flex", gap: 2 }}>
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
                name="phoneNumber"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phone No"
                    placeholder="+923004570193"
                    fullWidth
                    margin="normal"
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber && "Phone No is required"}
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
            <Box>
              {show ? (
                <></>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    // alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    my: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      // border: "1px solid red",
                    }}
                  >
                    <TextField
                      type="text"
                      inputProps={{
                        maxLength: 6,
                      }}
                      value={otp}
                      onChange={handleOtpChange}
                      placeholder="Enter OTP"
                      // sx={{ width: "150px" }}
                    />
                    <Button
                      onClick={verifyNumberHandler}
                      disabled={isButtonDisabled} // Disable the button if the condition is true
                      sx={{
                        color: "red",
                        // height: "12px",
                      }}
                    >
                      Verify Number
                    </Button>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      // justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      // variant="gradient"
                      onClick={handResendVerifyCode}
                      disabled={timerRunning || !resendButtonEnabled}
                    >
                      {timerRunning ? "Sending..." : "Resend OTP"}
                    </Button>
                    <p>{formatTime(seconds)}</p>
                  </Box>
                </Box>
              )}
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
