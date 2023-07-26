import { Box, Button, Container, InputBase, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import Loading from "../Loader/Loading";
import { useDispatch } from "react-redux";
import { resendVerificationCode } from "../../ReduxToolKit/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ReSendVerifyCode = ({ reSendEmail, handleClose }) => {
  console.log("reSendEmail", reSendEmail);
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sendEmail, setSendEmail] = useState();

  // const data = useSelector((state) => state?.user?.user?.user);
  // const data = useSelector((state) => state.user);
  // console.log("data email", data?.email);
  // useEffect(() => {
  //   setSendEmail(data?.email);
  // }, [data]);

  useEffect(() => {
    setSendEmail(reSendEmail);
  }, [reSendEmail]);

  const handResendVerifyCode = async () => {
    setLoading(true);

    if (!sendEmail) {
      toast.error("Kindly type Your Email ");
      setLoading(false);
    }
    // setLoading(true);

    // dispatch(resendVerificationCode(sendEmail));
    console.log("sendEmail", sendEmail);
    // setLoading(true);
    // handleClose();
    const response = await dispatch(resendVerificationCode(sendEmail));
    setLoading(false);
    if (response.payload) {
      handleStartTimer();
      navigate("/verificationCode");
    }
    setLoading(false);
    setTimeout(() => {
      handleClose();
    }, 60000);
  };

  // _______________Loading State________________
  const [loading, setLoading] = useState(false);

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

  return (
    <>
      <Loading isLoading={loading} />

      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              boxShadow: theme.palette.background.boxShadow,
              // width: { md: "50%", sm: "60%", xs: "100%" },
              py: { md: 8, sm: 6, xs: 4 },
              px: { md: 6, sm: 4, xs: 2 },
              // border: "1px solid red",
              mt: 2.5,
            }}
          >
            {/* <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                py: 2,
              }}
            >
              Resend Verify Code
            </Typography> */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                px: 2,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  // border: "1px solid red",
                }}
              >
                <InputBase
                  placeholder={`Enter Your Email`}
                  value={sendEmail}
                  onChange={(e) => setSendEmail(e.target.value)}
                  required
                  sx={{
                    background: theme.palette.background.grayBg,
                    border: `1px solid ${theme.palette.background.borderLight}`,
                    mx: 5,
                    borderRadius: "10px",
                    width: "100%",
                    py: 0.7,
                    px: 0.5,
                    textAlign: "center",
                    // border: "1px solid red",
                  }}
                />
                <Box
                  sx={{
                    textAlign: "right",
                    pr: 1.5,
                  }}
                >
                  <div>
                    <p>{formatTime(seconds)}</p>
                    {/* <Button
                      variant="gradient"
                      onClick={handleStartTimer}
                      disabled={timerRunning || !resendButtonEnabled}
                      sx={{
                        width: { md: "70%", sm: "80%", xs: "90%" },
                        px: 2,
                      }}
                    >
                      {timerRunning ? "Sending..." : "Resend Code"}
                    </Button> */}
                  </div>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="gradient"
                  onClick={handResendVerifyCode}
                  disabled={timerRunning || !resendButtonEnabled}
                  sx={{
                    width: { md: "70%", sm: "80%", xs: "90%" },
                    px: 2,
                  }}
                >
                  {timerRunning ? "Sending..." : "Resend Code"}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ReSendVerifyCode;
