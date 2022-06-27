import Avatar from "@mui/material/Avatar"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import PostAddIcon from "@mui/icons-material/PostAdd"
import { Box, Button } from "@mui/material"

function AreYouSure({ handleClose, type, open, file, postFile }) {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Avatar sx={{ mt: 3 }}>
          <PostAddIcon />
        </Avatar>
        <DialogTitle id="dialog-title">
          {file === null ? ".xlsx" : file.name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-description">
            this action will {type} the content of the database so be careful of
            what you are doing. click on {type} when you know what you are doing
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} sx={{ color: "GrayText" }}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleClose()
              postFile()
            }}
          >
            {type}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}

export default AreYouSure
