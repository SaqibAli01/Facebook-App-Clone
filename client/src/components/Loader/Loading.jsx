import { Backdrop, Box } from "@mui/material";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";

// Inspired by the former Facebook spinners.
function FacebookCircularProgress(props) {
  return (
    <Box sx={{ position: "relative" }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) => theme.palette.grey[200],
        }}
        size={80}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: "#0DF17F",
          animationDuration: "550ms",
          position: "absolute",

          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        size={80}
        thickness={4}
        {...props}
      />
    </Box>
  );
}

// eslint-disable-next-line react/prop-types
const Loading = ({ isLoading }) => {
  return (
    <div style={{ zIndex: 999 }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <FacebookCircularProgress />
      </Backdrop>
    </div>
  );
};

export default Loading;
