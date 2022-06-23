import useMediaQuery from "@mui/material/useMediaQuery"
import { useRouter } from "next/router"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import Button from "@mui/material/Button"
import { useTheme } from "@mui/material/styles"
import { useEffect, useState } from "react"

const Sheets = ({ open, resources, handleClose }) => {
  const { name, text, id } = resources
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"))
  const [isLoading, setIsLoading] = useState(true)
  const [info, setInfo] = useState(null)
  useEffect(() => {
    if (!id) return
    const getInfo = async () => {
      const character = await fetch(`http://localhost:8000/listes/${id}`)
      const data = await character.json()
      console.log(data)
      if (character.status === 200) {
        setIsLoading(false)
        setInfo(data)
      } else {
        setIsLoading(false)
      }
    }
    getInfo()
  }, [id])

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      scroll="paper"
      fullWidth
      maxWidth="lg"
    >
      <DialogTitle id="responsive-dialog-title">{name}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Disagree
        </Button>
        <Button onClick={handleClose} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Sheets
