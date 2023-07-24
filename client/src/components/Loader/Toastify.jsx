// / eslint-disable react/prop-types /
import { Alert, Snackbar } from "@mui/material";

// eslint-disable-next-line react/prop-types
const Toastify = ({ alertState, setAlertState }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      // eslint-disable-next-line react/prop-types
      open={alertState.open}
      autoHideDuration={3000}
      key={"top" + "center"}
      onClose={() => setAlertState({ ...alertState, open: false })}
    >
      <Alert
        onClose={() => setAlertState({ ...alertState, open: false })}
        // eslint-disable-next-line react/prop-types
        severity={alertState.severity}
      >
        {/* {/ // eslint-disable-next-line react/prop-types /} */}
        {alertState.message}
      </Alert>
    </Snackbar>
  );
};

export default Toastify;
