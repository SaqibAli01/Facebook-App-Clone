import { Typography, useTheme } from "@mui/material";
import { Box, Container } from "@mui/material";
import React from "react";

const Message = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        mt: { md: 6, sm: 4, xs: 2 },
      }}
    >
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: { md: "36px", sm: "30px", xs: "20px" },
              fontWeight: 600,
              py: 2,
            }}
          >
            Thank you!
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontSize: { md: "20px", sm: "16px", xs: "12px" },
              fontWeight: 600,
            }}
          >
            Successfully sent email. Kindly check your inbox and verify the
            email.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Message;
