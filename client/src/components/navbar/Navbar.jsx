import React from "react";
import NavWeb from "./NavWeb";
import NavMob from "./NavMob";
import { Box, Hidden, useTheme } from "@mui/material";

const Navbar = ({ themeToggler, mode }) => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          width: "100%",
          boxShadow: theme.palette.background.NavShadow,
          mb: 3,
        }}
      >
        <Box>
          <Hidden lgDown>
            <NavWeb mode={mode} themeToggler={themeToggler} />
          </Hidden>
          <Hidden lgUp>
            <NavMob />
          </Hidden>
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
