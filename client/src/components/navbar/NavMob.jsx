import React, { useEffect, useState } from "react";
import Hidden from "@mui/material/Hidden";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import MenuIcon from "@mui/icons-material/Menu";
import clsx from "clsx";
import { Avatar, Paper, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import avatarBg from "../../images/bgAvatar.png";

// import logo from "../../images/logo.png";

//theme

import { useTheme } from "@mui/material";
import { useSelector } from "react-redux";

// const array = [
//   { name: "Home", link1: "/" },
//   { name: "About", link1: "/about" },
//   { name: "Contact", link1: "/contact" },
//   { name: "Profile", link1: "/profile" },
//   { name: "Logout", link1: "/logout" },
// ];

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
    alignItems: "center",
  },
  paper: {
    background: "#F5F1F1",
    justifyContent: "flex-start",
  },
  hover: {
    "&:hover": {
      color: "",
    },
  },
});

const NavMob = ({ children }) => {
  //theme
  const theme = useTheme();

  const [name, setName] = useState();
  const [imgAvatar, setImgAvatar] = useState();
  const data = useSelector((state) => state?.user?.user?.user);

  // console.log("name", name);
  // console.log(`http://localhost:8000/${imgAvatar}`);
  useEffect(() => {
    setName(data?.firstName);
    setImgAvatar(data?.avatar);
  }, [data]);

  const imageUrl = "http://localhost:8000/";

  const array = data
    ? [
        { name: "Home", link1: "/" },
        { name: "About", link1: "/about" },
        { name: "Contact", link1: "/contact" },
        { name: "Profile", link1: "/profile" },
        { name: "Logout", link1: "/logout" },
      ]
    : [
        { name: "Home", link1: "/" },
        { name: "About", link1: "/about" },
        { name: "Contact", link1: "/contact" },
        { name: "Login", link1: "/login" },
        { name: "Sign Up", link1: "/signup" },
      ];

  const classes = useStyles();
  const [state, setState] = React.useState({ left: false });

  const styledActiveLink = ({ isActive }) => {
    return {
      FontFamily: "Poppins",
      textDecoration: "none",
      textTransform: "uppercase",
      padding: "10px 20px",
      borderRadius: "5px",
      fontSize: isActive ? "30px" : "20px",
      // color: isActive ? "#FEFEFE" : "#242323",
      color: isActive
        ? theme.palette.text.navBtnText
        : theme.palette.text.primary,
      // color: isActive
      //   ? theme.palette.text.secondary
      //   : theme.palette.text.primary,
      display: "flex",
      gap: "20px",
      alignItems: "center",
      // background: isActive ? " #00aee6" : "",
      // background: isActive ? "theme.palette.background.secondary" : "",
      background: isActive ? theme.palette.background.navBtn : "",
    };
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <div
      key={anchor}
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {children}
      <br />
      <Box
        sx={{
          display: "flex",
          width: "150px",
          mx: "auto",
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
          <h2>{name}</h2>
        </Box>

        {/* <img
          src={`${imageUrl}${imgAvatar}`}
          alt=""
          style={{ height: "100%", width: "100%", objectFit: "cover" }}
        /> */}
      </Box>

      <List sx={{ mt: 5 }}>
        {array.map(({ link1, name }, index) => {
          return (
            <React.Fragment key={index}>
              <NavLink to={link1} key={index} style={styledActiveLink}>
                <Typography sx={{ fontFamily: "Poppins", color: "red" }}>
                  {name}
                </Typography>
              </NavLink>
            </React.Fragment>
          );
        })}
      </List>
    </div>
  );
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        // height="55px"
        width="100%"
        mt="0px"
      >
        <Box sx={{ width: "100%" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt="0px"
            backgroundColor="red"
            sx={{
              height: "60px",
              backgroundColor: "#242323;",
              boxShadow: "0px 0px 7px  rgba(0, 0, 0, 0.25)",
            }}
          >
            <Hidden lgUp>
              {["left"].map((anchor, index) => (
                <React.Fragment key={index}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      backgroundColor: "#242323",
                    }}
                  >
                    <Button
                      onClick={toggleDrawer(anchor, true)}
                      style={{ zIndex: 1 }}
                    >
                      <MenuIcon
                        sx={{
                          fontSize: "25px",
                          cursor: "pointer",

                          color: "White",
                        }}
                      />
                    </Button>
                  </Box>
                  <Paper>
                    <SwipeableDrawer
                      classes={{ paper: classes.paper }}
                      anchor={anchor}
                      open={state[anchor]}
                      onClose={toggleDrawer(anchor, false)}
                      onOpen={toggleDrawer(anchor, true)}
                    >
                      {list(anchor)}
                    </SwipeableDrawer>
                  </Paper>
                </React.Fragment>
              ))}
            </Hidden>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default NavMob;
