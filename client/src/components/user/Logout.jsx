import {
  Avatar,
  Box,
  Button,
  Container,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { logout } from "../../ReduxToolKit/userSlice";
import Loading from "../Loader/Loading";
import avatarBg from "../../images/bgAvatar.png";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state?.user?.user?.user);

  const [F_Name, setFName] = useState();
  const [L_Name, setLName] = useState();
  const [email, setEmail] = useState();
  const [imgAvatar, setImgAvatar] = useState();

  const imageUrl = "http://localhost:8000/";

  useEffect(() => {
    setFName(data?.firstName);
    setLName(data?.lastName);
    setEmail(data?.email);
    setImgAvatar(data?.avatar);
  }, [data]);

  // _______________Loading State________________
  const [loading, setLoading] = useState(false);

  const onClinkHandlerLogout = () => {
    setLoading(true);

    dispatch(logout());
    setTimeout(() => {
      navigate("/login");
      // dispatch(authenticateUser());
      setLoading(false);
    }, 3000);
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
              py: 2,
            }}
          >
            User Logout
          </Typography>

          <Box>
            {imgAvatar ? (
              <Avatar
                src={`${imageUrl}${imgAvatar}`}
                sx={{ width: 100, height: 100, my: 2, m: "auto" }}
              />
            ) : (
              <Avatar
                src={avatarBg}
                sx={{ width: 100, height: 100, my: 2, m: "auto" }}
              />
            )}
          </Box>

          <Box sx={{ py: 3 }}>
            <Typography
              variant="h5"
              sx={{
                textAlign: "center",
              }}
            >
              {data ? `User Name: ${F_Name} ${L_Name} ` : "User Name"}
              {/* Saqib Ali */}
            </Typography>

            <Typography
              variant="h5"
              sx={{
                textAlign: "center",
              }}
            >
              {data ? `Email: ${email}` : "User Email"}

              {/* saqibali046@gmail.com */}
            </Typography>
          </Box>

          <Box
            display={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button variant="gradient" onClick={onClinkHandlerLogout}>
              Logout
            </Button>
          </Box>
        </Box>
      </Container>
      ;
    </>
  );
};

export default Logout;
