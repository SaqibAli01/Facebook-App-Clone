import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Container,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import {
  authenticateUser,
  logout,
  updatePassword,
} from "../../ReduxToolKit/userSlice";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data) => {
    console.log("____Data____", data);
    // const formData = new FormData();
    // for (const key in data) {
    //   console.log("key", key);
    //   formData.append(key, data[key]);
    // }
    // dispatch(updatePassword(formData));
    // dispatch(updatePassword(data));

    const response = await dispatch(updatePassword(data));

    if (response.payload) {
      navigate("/login");
    }

    setTimeout(() => {
      dispatch(logout());

      dispatch(authenticateUser());
    }, 3000);
  };

  const handleToggleOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const handleToggleNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Container>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 10,
          //   border: "2px solid red",
        }}
      >
        <TextField
          type={showOldPassword ? "text" : "password"}
          label="Old Password"
          {...register("oldPassword", {
            required: "Old Password is required",
          })}
          error={!!errors.oldPassword}
          helperText={errors.oldPassword?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleToggleOldPassword} edge="end">
                  {showOldPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mt: 0.8 }}
        />
        <TextField
          type={showNewPassword ? "text" : "password"}
          label="New Password"
          {...register("newPassword", {
            required: "New Password is required",
          })}
          error={!!errors.newPassword}
          helperText={errors.newPassword?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleToggleNewPassword} edge="end">
                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ my: 0.5 }}
        />

        <TextField
          type={showConfirmPassword ? "text" : "password"}
          label="Confirm Password"
          {...register("confirmPassword", {
            required: "Confirm Password is required",
            validate: (value) =>
              value === getValues("newPassword") || "Passwords do not match",
          })}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleToggleConfirmPassword} edge="end">
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          variant="gradient"
          sx={{
            width: "100%",
          }}
        >
          Update Password
        </Button>
      </form>
    </Container>
  );
};

export default UpdatePassword;
