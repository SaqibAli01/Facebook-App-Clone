import React, { useState } from "react";
import Loading from "../Loader/Loading";
import { Box, Button, Container, useTheme } from "@mui/material";

const Contact = () => {
  // _______________Loading State________________
  const [loading, setLoading] = useState(false);

  const loadingHandler = () => {
    setLoading(true);
  };
  // _______________Loading State________________
  const theme = useTheme();

  return (
    <>
      <Loading isLoading={loading} />
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            //  flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              // alignItems: "center",
              flexDirection: "column",
              width: { md: "60%", sm: "70%", xs: "100%" },

              boxShadow: theme.palette.background.boxShadow,

              p: 4,
            }}
          >
            <Button onClick={loadingHandler}>Contact</Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Contact;
