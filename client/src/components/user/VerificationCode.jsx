import React, { useState, useRef, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Loading from "../Loader/Loading";
import { useTheme } from "@emotion/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verification } from "../../ReduxToolKit/userSlice";
import Timer from "./Timer";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import ReSendVerifyCode from "./ReSendVerifyCode";

const VerificationCodeInput = styled(TextField)(({ theme }) => ({
  "& input": {
    textAlign: "center",
    width: "2rem",
    height: "2rem",
    fontSize: "1.5rem",
    borderRadius: theme.shape.borderRadius,
    // border: `1px solid ${theme.palette.divider}`,
    border: `1px solid ${theme.palette.background.borderLight}`,

    // margin: "0 0.5rem",
    m: 1,
    // backgroundColor: "yellow",
    outline: "none",
    "&::-webkit-inner-spin-button, &::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
  },
}));

const VerificationCode = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const data = useSelector((state) => state); // Check the slice name 'user'
  // console.log("data email", data?.email);
  const [reSendEmail, setRdSendEmail] = useState();
  const location = useLocation();

  const setSendEmail = location?.state?.reSendEmail;
  console.log("🚀 ~ file reSendEmail:", reSendEmail);

  useEffect(() => {
    setRdSendEmail(setSendEmail);
  }, [setSendEmail]);

  // _______________Loading State________________
  const [loading, setLoading] = useState(false);

  const codeBoxes = Array.from({ length: 6 }, () => "");

  const [verificationCode, setVerificationCode] = useState(codeBoxes);

  const codeInputRefs = useRef([]);

  const handleChange = (index, event) => {
    const value = event.target.value;
    if (value.length <= 1) {
      setVerificationCode((prevCode) => {
        const newCode = [...prevCode];
        newCode[index] = value;
        return newCode;
      });

      if (value !== "") {
        // Move focus to the next input box
        if (index < codeBoxes.length - 1) {
          codeInputRefs.current[index + 1].focus();
        }
      }
    }
  };

  const handleKeyDown = (index, event) => {
    // Handle backspace
    if (event.key === "Backspace" && verificationCode[index] === "") {
      setVerificationCode((prevCode) => {
        const newCode = [...prevCode];
        newCode[index - 1] = "";
        return newCode;
      });

      // Move focus to the previous input box
      if (index > 0) {
        codeInputRefs.current[index - 1].focus();
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const output = verificationCode.join("");

    if (output.length !== 6) {
      return toast.error("Please Enter Write Verification Code");
    }

    setLoading(true);

    const response = await dispatch(verification(output));

    setLoading(false);
    if (response.payload) {
      navigate("/login");
    }
    setLoading(false);

    // console.log("verificationCode", verificationCode.join(""));
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Loading isLoading={loading} />
      <Container>
        <Box
          sx={{
            boxShadow: theme.palette.background.boxShadow,
            width: { md: "100%", sm: "100%", xs: "100%" },
            py: { md: 8, sm: 6, xs: 4 },
            px: { md: 6, sm: 4, xs: 2 },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              py: 4,
            }}
          >
            Email Verification Code
          </Typography>
          <Box>
            <form onSubmit={handleSubmit}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <VerificationCodeInput
                  variant="outlined"
                  value={verificationCode[0]}
                  onChange={(event) => handleChange(0, event)}
                  onKeyDown={(event) => handleKeyDown(0, event)}
                  inputRef={(el) => (codeInputRefs.current[0] = el)}
                  autoFocus
                  autoFocusAutoSelect
                  inputProps={{ maxLength: 1 }}
                  sx={{
                    m: 0.5,
                  }}
                />

                {/* Render the rest of the input boxes */}
                {verificationCode.slice(1).map((digit, index) => (
                  <VerificationCodeInput
                    key={index + 1}
                    variant="outlined"
                    value={digit}
                    onChange={(event) => handleChange(index + 1, event)}
                    onKeyDown={(event) => handleKeyDown(index + 1, event)}
                    inputRef={(el) => (codeInputRefs.current[index + 1] = el)}
                    inputProps={{ maxLength: 1 }}
                    sx={{
                      m: 0.5,
                    }}
                  />
                ))}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Timer />
                <Box>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                      width: { md: "200px", sm: "150px", xs: "100px" },
                      py: 1.1,
                    }}
                  >
                    Verified
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    py: 2,
                  }}
                >
                  <Button onClick={handleOpen}>Resend Code</Button>

                  {/* <Link
                    // to="/reSendVerifyCode"
                    to={{
                      pathname: "/reSendVerifyCode",
                      state: { reSendEmail: reSendEmail },
                    }}
                  >
                    <span style={{ textDecoration: "none" }}>Resend Code</span>
                  </Link> */}
                </Box>
              </Box>
            </form>
          </Box>

          <div>
            {/* <Button onClick={handleOpen}>Resend Code</Button> */}

            <Dialog open={isOpen} onClose={handleClose}>
              <DialogTitle>
                <Typography
                  variant="h4"
                  sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  Resend Verify Code
                </Typography>
              </DialogTitle>
              <DialogContent>
                <ReSendVerifyCode
                  reSendEmail={reSendEmail}
                  handleClose={handleClose}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Close</Button>
              </DialogActions>
            </Dialog>
          </div>
        </Box>
      </Container>
    </>
  );
};

export default VerificationCode;
