import Snackbar from "@mui/material/Snackbar"
import MuiAlert from "@mui/material/Alert"
import { forwardRef } from "react"
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})
function Notification({ openToast, setOpenToast, notification, duration }) {
  return (
    <Snackbar
      open={openToast}
      autoHideDuration={duration ? duration : 6000}
      onClose={() => setOpenToast(false)}
    >
      <Alert
        onClose={() => setOpenToast(false)}
        severity={notification.severity}
        sx={{
          width: "100%",
        }}
      >
        {notification.content}
      </Alert>
    </Snackbar>
  )
}
export default Notification
