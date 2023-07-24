import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  Input,
  InputBase,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Loading from "../Loader/Loading";
import { useDispatch, useSelector } from "react-redux";
import avatarBg from "../../images/bgAvatar.png";
import { createPost } from "../../ReduxToolKit/postSlice";
import { toast } from "react-toastify";
import PostList from "./PostList";
// import MoreVertIcon from '@mui/icons-material/MoreVert';

const Home = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  // _______________Loading State________________
  const [loading, setLoading] = useState(false);

  // _______________
  const [F_Name, setFName] = useState("");
  const [L_Name, setLName] = useState("");
  const [imgAvatar, setImgAvatar] = useState();
  //loadings, error,
  // const { user, successMessage } = useSelector((state) => state.user);
  const data = useSelector((state) => state?.user?.user?.user);
  useEffect(() => {
    setFName(data?.firstName);
    setLName(data?.lastName);
    setImgAvatar(data?.avatar);
  }, [data]);

  const imageUrl = "http://localhost:8000/";

  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [text, setTextValue] = useState("");

  const handleFileChange = (event) => {
    const myFile = event.target.files[0];
    setFile(myFile);
    if (myFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(myFile);
    }
  };

  const handleClearImage = () => {
    setImage(null);
  };

  const handleSubmit = () => {
    setLoading(true);
    if (!text || !file) {
      toast.success("Kindly Selected  Text or File");
      setLoading(false);
      return;
    }

    dispatch(createPost({ text, file }));
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
            width: "100%",
          }}
        >
          <Box
            sx={{
              boxShadow: theme.palette.background.boxShadow,
              width: { md: "70%", sm: "80%", xs: "100%" },
              py: { md: 8, sm: 6, xs: 4 },
              px: { md: 6, sm: 4, xs: 2 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                // alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 3,
                // border: "1px solid red",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  px: 2,
                  // flexDirection: "column",
                }}
              >
                {imgAvatar ? (
                  <Avatar
                    src={`${imageUrl}${imgAvatar}`}
                    sx={{ width: 50, height: 50, my: 2 }}
                  />
                ) : (
                  <Avatar
                    src={avatarBg}
                    sx={{ width: 60, height: 60, my: 2 }}
                  />
                )}
                {/* 
              <Typography variant="h5">
                {data ? ` ${F_Name} ${L_Name} ` : "Name"}
               
              </Typography> */}

                <InputBase
                  placeholder={`What on your Mind, ${
                    data ? ` ${F_Name} ${L_Name} ` : "?"
                  }`}
                  value={text}
                  onChange={(e) => setTextValue(e.target.value)}
                  sx={{
                    background: theme.palette.background.grayBg,
                    px: 5,
                    borderRadius: "20px",
                    width: "100%",
                    py: 0.7,
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                {/* <FormControl>
                  <InputLabel htmlFor="image-input">Select Image</InputLabel>
                  <Input
                    id="image-input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </FormControl>
                {image && (
                  <div>
                    <img src={image} alt="Selected" />
                    <Button onClick={handleClearImage}>Clear Image</Button>
                  </div>
                )} */}

                {image ? (
                  <div>
                    <img
                      src={image}
                      alt="Selected"
                      style={{ width: "200px" }}
                    />
                    <br />
                    <Button onClick={handleClearImage}>Clear Image</Button>
                  </div>
                ) : (
                  <FormControl>
                    {/* <InputLabel htmlFor="image-input">Select Image</InputLabel> */}
                    <Input
                      id="image-input"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                    <Button
                      component="label"
                      htmlFor="image-input"
                      // variant="gradient"
                      sx={{
                        color: theme.palette.text.navBtnText,
                        background: theme.palette.background.navBtn,
                        px: 4,
                      }}
                    >
                      Select File
                    </Button>
                  </FormControl>
                )}
              </Box>

              <Button
                variant="gradient"
                color="primary"
                onClick={handleSubmit}
                sx={{
                  // width: { md: "50%", sm: "60%" },
                  mx: { md: 20, sm: 15, xs: 10 },
                }}
              >
                Post
              </Button>
            </Box>

            {/* Post List  */}
            <PostList />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Home;
