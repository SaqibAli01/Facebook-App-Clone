import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getAllPosts } from "../../ReduxToolKit/postSlice";
import {
  Avatar,
  Box,
  Button,
  InputBase,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import avatarBg from "../../images/bgAvatar.png";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCommentIcon from "@mui/icons-material/AddComment";
import ShareIcon from "@mui/icons-material/Share";
import Loading from "../Loader/Loading";
import DeleteIcon from "@mui/icons-material/Delete";
import { likePost } from "../../ReduxToolKit/PostLikes";
import { toast } from "react-toastify";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import {
  addComment,
  deleteComment,
  likeComments,
} from "../../ReduxToolKit/commentSlice";

const PostList = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  //______________________________like__________________________________

  const [likedPosts, setLikedPosts] = useState([]);
  const [likedComment, setLikedComment] = useState([]);

  // _______________Loading State________________
  const [loadings, setLoading] = useState(false);

  const [text, setTextValue] = useState(""); // comment text

  const [activePost, setActivePost] = useState(null);
  const [showCommentField, setShowCommentField] = useState(false);

  const [loggedInUserId, setLoggedInUserId] = useState();
  const data = useSelector((state) => state?.user?.user?.user);

  const { posts, error } = useSelector((state) => state?.post);
  console.log("posts", posts);

  useEffect(() => {
    dispatch(getAllPosts());
    setLoggedInUserId(data?._id);
  }, [dispatch, data]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const getAllPost = () => {
    dispatch(getAllPosts());
  };

  const imageUrl = "http://localhost:8000/";
  //______________________________like__________________________________

  const likeHandler = (postId) => {
    // alert(`http://localhost:8000/api/v1/like/${postId}`);
    dispatch(likePost(postId));

    const isPostLiked = likedPosts && likedPosts.includes(postId);

    if (isPostLiked) {
      // Unlike the post
      setLikedPosts(likedPosts.filter((id) => id !== postId));
    } else {
      // Like the post
      setLikedPosts([...likedPosts, postId]);
    }

    setTimeout(() => {
      dispatch(getAllPosts());
    }, 3000);
  };
  //____________________Add Comment Handler --------------------------------

  const addCommentHandler = (postId) => {
    // alert(postId);
    setActivePost(postId);
    setShowCommentField(true);
  };

  const handleCommentSubmit = (postId) => {
    // e.preventDefault();
    setLoading(true);
    if (!text) {
      toast.success("Kindly type comment");
      setLoading(false);
      return;
    }
    dispatch(addComment({ text, postId }));

    setTimeout(() => {
      setLoading(false);
      setTextValue("");
      dispatch(getAllPosts());
    }, 3000);
  };

  //____________Delete Comment________________
  const handleDeleteComment = (commentId) => {
    // alert(commentId);
    setLoading(true);
    dispatch(deleteComment(commentId));

    setTimeout(() => {
      setTextValue("");
      dispatch(getAllPosts());
      setLoading(false);
    }, 3000);
  };

  const handleLikeComment = (commentId) => {
    dispatch(likeComments(commentId));

    const isPostLike = likedComment && likedComment.includes(commentId);

    if (isPostLike) {
      // Unlike the post
      setLikedComment(likedComment.filter((id) => id !== commentId));
    } else {
      // Like the post
      setLikedComment([...likedComment, commentId]);
    }

    setTimeout(() => {
      dispatch(getAllPosts());
    }, 3000);
  };
  //--------------------------------Post Del--------------------------------
  const handleDeletePost = (postId) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmation) {
      setLoading(true);
      dispatch(deletePost(postId));
    }

    setTimeout(() => {
      setLoading(false);

      dispatch(getAllPosts());
    }, 3000);
  };
  return (
    <>
      <Loading isLoading={loadings} />

      <Box>
        <Button onClick={getAllPost}>All Post</Button>

        {[...posts].reverse().map((post) => (
          <Box key={post?._id}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 4,
                // border: "1px solid",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                {posts ? (
                  <Avatar
                    src={`${imageUrl}${post?.author?.avatar}`}
                    sx={{ width: 50, height: 50, my: 0.5 }}
                  />
                ) : (
                  <Avatar
                    src={avatarBg}
                    sx={{ width: 50, height: 50, my: 0.5 }}
                  />
                )}
                <Typography variant="h5">
                  {post?.author?.firstName} {post?.author?.lastName}
                </Typography>
              </Box>
              <Box>
                <MoreVertIcon
                  onClick={() => handleDeletePost(post._id)}
                  sx={{
                    cursor: "pointer",
                  }}
                />
              </Box>
            </Box>
            <h3>{post.text}</h3>
            {/* {console.log("first", `http://localhost:8000/${post.file}`)} */}
            {post.file && (
              <Box sx={{ width: "100%", height: "100%" }}>
                <img
                  src={`${imageUrl}${post?.file}`}
                  alt="PostImage"
                  style={{ width: "100%", maxHeight: 400 }}
                />
              </Box>
            )}
            <Box
              sx={{
                border: `2px solid ${theme.palette.background.borderLight}`,
                display: "flex",
                justifyContent: "space-around",
                //   gap: 3,
                background: theme.palette.background.light,
              }}
            >
              <Button onClick={(e) => likeHandler(post?._id)}>
                {likedPosts && likedPosts.includes(post._id) ? (
                  <FavoriteIcon style={{ color: "green" }} />
                ) : (
                  <FavoriteIcon style={{ color: "red" }} />
                )}
                Likes
                <Typography variant="p" sx={{ pl: 3 }}>
                  {post?.likes?.length}
                </Typography>
              </Button>

              <Button onClick={(e) => addCommentHandler(post?._id)}>
                <AddCommentIcon /> Comment
              </Button>
              <Button>
                <ShareIcon /> Share
              </Button>
            </Box>
            {/* <p>Likes: {post?.likes?.length}</p> */}
            <Box
              sx={
                {
                  // border: "2px solid red",
                }
              }
            >
              <h4>Comments:</h4>
              {/* ${ data ? ` ${F_Name} ${L_Name} ` : "?"} */}

              {/* /handleCommentSubmit */}
              {showCommentField && activePost === post._id && (
                <Box
                  sx={{
                    display: "flex",
                    gap: 3,
                    px: 2,
                  }}
                >
                  <InputBase
                    placeholder={`What on your Mind, `}
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
                  <Button
                    variant="gradient"
                    onClick={(e) => handleCommentSubmit(post?._id)}
                    sx={{
                      // color: theme.palette.text.navBtnText,
                      // background: theme.palette.background.navBtn,
                      px: 2,
                    }}
                  >
                    Comment
                  </Button>
                </Box>
              )}
              {post.comments.map((comment) => {
                return (
                  <>
                    <Stack
                      direction="row"
                      spacing={2}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      sx={{
                        background: theme.palette.background.light,
                        px: 1,
                        my: 1,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        <Avatar
                          src={`${imageUrl}${comment?.author?.avatar}`}
                          sx={{ width: 50, height: 50, my: 0.5 }}
                        />
                        <Typography variant="h5">
                          {comment?.author?.firstName}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography>{comment?.text}</Typography>
                      </Box>
                      <Box>
                        {comment?.author?._id === loggedInUserId ||
                        post?.author?._id === loggedInUserId ? (
                          <Button
                            onClick={() =>
                              handleDeleteComment(
                                comment._id,
                                post?.author?._id
                              )
                            }
                          >
                            <DeleteIcon />
                          </Button>
                        ) : null}
                      </Box>
                      <Box>
                        <Button
                          // variant="gradient"
                          onClick={(e) => handleLikeComment(comment?._id)}
                        >
                          {likedComment &&
                          likedComment.includes(comment?._id) ? (
                            <FavoriteIcon style={{ color: "green" }} />
                          ) : (
                            <FavoriteIcon style={{ color: "red" }} />
                          )}
                          Likes
                          <Typography variant="p" sx={{ pl: 3 }}>
                            {comment?.likes?.length}
                          </Typography>
                        </Button>
                      </Box>
                    </Stack>
                  </>
                );
              })}
            </Box>
            <hr />
          </Box>
        ))}
      </Box>
    </>
  );
};

export default PostList;
