import React, { useEffect, useState } from "react";
import Loading from "../Loader/Loading";
import { Avatar, Box, Button, Container, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUserPosts } from "../../ReduxToolKit/postSlice";
import avatarBg from "../../images/bgAvatar.png";

import UserPostList from "./UserPostList";

const About = () => {
  const dispatch = useDispatch();

  const [F_Name, setFName] = useState();
  const [L_Name, setLName] = useState();
  //   const [email, setEmail] = useState();
  const [imgAvatar, setImgAvatar] = useState();

  // _______________Loading State________________
  const [loading, setLoading] = useState(false);

  // _______________Loading State________________
  const theme = useTheme();

  const data = useSelector((state) => state?.user?.user?.user);

  const [userId, setUserId] = useState();
  useEffect(() => {
    setUserId(data?._id);
    setFName(data?.firstName);
    setLName(data?.lastName);
    // setEmail(data?.email);
    setImgAvatar(data?.avatar);
  }, [data]);
  const imageUrl = "http://localhost:8000/";
  const getUserPostHandler = () => {
    setLoading(true);
    dispatch(getUserPosts(userId));
    setLoading(false);
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
            <Button onClick={getUserPostHandler}>
              {data ? `${F_Name} ${L_Name} ` : "Refresh"}
            </Button>

            {/* <Box sx={{ py: 3 }}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "center    ",
                }}
              >
                {data ? `Name: ${F_Name} ${L_Name} ` : "User Name"}
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  textAlign: "center",
                }}
              >
                {data ? `Email: ${email}` : "User Email"}
              </Typography>
            </Box> */}

            <UserPostList />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default About;
