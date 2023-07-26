import React from "react";
import { Container, Grid, Typography, Link } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(3),
    marginTop: "auto",
    color: theme.palette.common.white,
  },
  logo: {
    width: "24px",
    height: "24px",
    marginRight: "8px",
    verticalAlign: "middle",
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <img
              src="https://i.ibb.co/QDy827D/ak-logo.png"
              alt="logo"
              className={classes.logo}
            />
            <Typography variant="body2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
              ipsum
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body1">
              1120 Lorem ipsum dolor sit amet, KC 179050, Chandigarh.
            </Typography>
            <Typography variant="body1">
              +01 2345 6789 12<span>|</span>+01 2345 6789 12
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.contactSocial}>
              <Link href="#" className={classes.socialIcon}>
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link href="#" className={classes.socialIcon}>
                <i className="fab fa-linkedin-in"></i>
              </Link>
              <Link href="#" className={classes.socialIcon}>
                <i className="fab fa-github"></i>
              </Link>
              <Link href="#" className={classes.socialIcon}>
                <i className="fab fa-behance"></i>
              </Link>
              <Link href="#" className={classes.socialIcon}>
                <i className="fab fa-pinterest-p"></i>
              </Link>
            </div>
          </Grid>
        </Grid>
      </Container>
      <Typography variant="body2" align="center" gutterBottom>
        &copy; {new Date().getFullYear()}{" "}
        <img
          src="https://i.ibb.co/QDy827D/ak-logo.png"
          alt="logo"
          className={classes.logo}
        />{" "}
        All Rights Reserved.
      </Typography>
    </footer>
  );
};

export default Footer;
