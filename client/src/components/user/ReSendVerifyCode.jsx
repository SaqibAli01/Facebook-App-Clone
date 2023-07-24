import { Box, Button, Container, InputBase, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import Loading from "../Loader/Loading";
import { useDispatch, useSelector } from "react-redux";

const ReSendVerifyCode = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [sendEmail, setSendEmail] = useState();

  const data = useSelector((state) => state?.user?.user?.user);
  console.log("data", data?.email);
  useEffect(() => {
    setSendEmail(data?.email);
  }, [data]);

  const handResendVerifyCode = () => {
    setLoading(true);
    alert("P");
    setLoading(false);
  };

  // _______________Loading State________________
  const [loading, setLoading] = useState(false);
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
              width: { md: "50%", sm: "60%", xs: "100%" },
              py: { md: 8, sm: 6, xs: 4 },
              px: { md: 6, sm: 4, xs: 2 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                px: 2,
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
                  px: 5,
                  borderRadius: "20px",
                  width: "100%",
                  py: 0.7,
                }}
              />
              <Button
                variant="gradient"
                onClick={handResendVerifyCode}
                sx={{
                  // color: theme.palette.text.navBtnText,
                  // background: theme.palette.background.navBtn,
                  px: 2,
                }}
              >
                Resend Verify Code
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ReSendVerifyCode;
