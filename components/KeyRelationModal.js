import { Slide, Slider } from "@mui/material"
import { forwardRef, useState } from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { ShowChart } from "@mui/icons-material"

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})
function KeyRelationModal({ relation }) {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button
        variant="outlined"
        endIcon={<ShowChart />}
        onClick={handleClickOpen}
      >
        Relations
      </Button>
      <Dialog
        fullWidth
        open={open}
        maxWidth="sm"
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        scroll="paper"
      >
        <DialogTitle>{"Relations"}</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Edit</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default KeyRelationModal
