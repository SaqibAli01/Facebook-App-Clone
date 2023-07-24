import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Loading from "../Loader/Loading";
import {
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import UpdatePassword from "./UpdatePassword";
import UserUpdatesInfo from "./UserUpdatesInfo";
import { authenticateUser, updateProfile } from "../../ReduxToolKit/userSlice";
// import PersonIcon from "@mui/icons-material/Person";
import avatarBg from "../../images/bgAvatar.png";
// import { useNavigate } from "react-router-dom";

const Profile = () => {
  const theme = useTheme();
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const [F_Name, setFName] = useState();
  const [L_Name, setLName] = useState();
  const [email, setEmail] = useState();
  const [imgAvatar, setImgAvatar] = useState();
  //loadings, error,
  // const { user, successMessage } = useSelector((state) => state.user);
  const data = useSelector((state) => state?.user?.user?.user);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // console.log(`http://localhost:8000/${imgAvatar}`);

  useEffect(() => {
    setFName(data?.firstName);
    setLName(data?.lastName);
    setEmail(data?.email);
    setImgAvatar(data?.avatar);
    // dispatch(authenticateUser());
    // if (user && user?.user) {
    //   setFName(user?.user?.firstName);
    //   setLName(user?.user?.firstName);
    //   setEmail(user?.user?.email);
    //   setImgAvatar(user?.user?.avatar);
    //   console.log("User name:", F_Name, L_Name);
    //   console.log("imgAvatar:", imgAvatar);
    // }
  }, [data]);

  const imageUrl = "http://localhost:8000/";

  // _______________Loading State________________
  const [loading, setLoading] = useState(false);

  // _______________Loading State________________

  //___________________________Dialog Box 1______________________________
  const [selectedFile, setSelectedFile] = useState(null);
  //update profile
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleProfileUpdate = () => {
    const formData = new FormData();
    formData.append("avatar", selectedFile);
    setLoading(true);
    dispatch(updateProfile(selectedFile));

    setSelectedFile(null);

    setTimeout(() => {
      dispatch(authenticateUser());
      setIsOpen(false);
      setLoading(false);
    }, 3000);
  };

  //___________________________Dialog Box 2_______________________

  const [isOpen2, setIsOpen2] = useState(false);

  const handleOpen2 = () => {
    setIsOpen2(true);
    // setLoading(true);
  };

  const handleClose2 = () => {
    setIsOpen2(false);
    dispatch(authenticateUser());
  };

  //___________________________Dialog Box 3_______________________

  const [isOpen3, setIsOpen3] = useState(false);

  const handleOpen3 = () => {
    setIsOpen3(true);
  };

  const handleClose3 = () => {
    setIsOpen3(false);
  };

  // const handleSubmit4 = () => {
  //   navigate("/updatePassword");
  // };

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
            User Profile
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
          {/* //Dialog  1*/}
          <Box>
            <Dialog open={isOpen} onClose={handleClose}>
              <Box sx={{ p: 2.5 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <Button onClick={handleClose}>
                    <CloseIcon />
                  </Button>
                </Box>

                <DialogTitle>
                  <Typography variant="h4" sx={{ textAlign: "center", pb: 2 }}>
                    Update Profile
                  </Typography>
                </DialogTitle>
                <DialogContent>
                  <Box>
                    <Avatar
                      src={
                        selectedFile
                          ? URL.createObjectURL(selectedFile)
                          : `${imageUrl}${imgAvatar}`
                      }
                      sx={{ width: 100, height: 100, my: 2, m: "auto" }}
                      onClick={handleOpen}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Box
                    sx={{
                      display: "flex",
                      //   justifyContent: "space-between",
                      // border: "1px solid red",
                      width: "100%",
                      m: 1,
                      p: 1,
                      gap: 4,
                    }}
                  >
                    <Button variant="gradient" component="label">
                      Change Profile
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                      />
                    </Button>
                    <Button onClick={handleProfileUpdate} variant="gradient">
                      Update Profile
                    </Button>
                  </Box>
                </DialogActions>
              </Box>
            </Dialog>
          </Box>
          {/* dialog box 2  */}
          <Box>
            <Box>
              <Dialog open={isOpen2} onClose={handleClose2}>
                <Box sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "end" }}>
                    <Button onClick={handleClose2}>
                      <CloseIcon />
                    </Button>
                  </Box>
                  <DialogTitle>
                    <Typography variant="h4" sx={{ textAlign: "center" }}>
                      Update Password
                    </Typography>
                  </DialogTitle>
                  <DialogContent>
                    <Box>
                      <UpdatePassword />
                    </Box>
                  </DialogContent>
                </Box>
              </Dialog>
            </Box>
          </Box>

          {/* dialog box 3  */}
          <Box>
            <Dialog open={isOpen3} onClose={handleClose3}>
              <Box sx={{ p: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <DialogActions>
                    {/* <Button onClick={handleClose3}>Close</Button> */}
                    <Button onClick={handleClose3}>
                      <CloseIcon />
                    </Button>
                  </DialogActions>
                </Box>
                <DialogTitle>
                  <Typography variant="h4" sx={{ textAlign: "center" }}>
                    Update Details
                  </Typography>
                </DialogTitle>
                <DialogContent>
                  <UserUpdatesInfo handleClose3={handleClose3} />
                </DialogContent>
              </Box>
            </Dialog>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Button type="submit" variant="gradient" onClick={handleOpen}>
              Update Profile
            </Button>

            <Button type="submit" variant="gradient" onClick={handleOpen2}>
              Update Password
            </Button>

            <Button type="submit" variant="gradient" onClick={handleOpen3}>
              Update User
            </Button>

            {/* <Button
              type="submit"
              variant="gradient"
              onClick={handleSubmit4}

              //   disabled={loadings}
            >
              Update Password
            </Button> */}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Profile;
