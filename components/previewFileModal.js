import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import CloseIcon from "@mui/icons-material/Close"
import Slide from "@mui/material/Slide"
import { forwardRef, useContext, useState } from "react"
import { DataGrid } from "@mui/x-data-grid"
import { Box } from "@mui/material"
import { Check } from "@mui/icons-material"
import { useRouter } from "next/router"
import FileContext, { FileContextProvider } from "../store/FileContext"
import { LoadingButton } from "@mui/lab"

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})
function PreviewFileModal({ open, closePreview, rows, columns, filename }) {
  const { handleAddListData } = useContext(FileContext)
  const [confirming, setConfirming] = useState(false)
  const Router = useRouter()
  const ConfirmHandler = async () => {
    setConfirming(true)
    handleAddListData(rows)
    Router.push({
      pathname: "confirmed",
      query: {
        title: filename,
        length: rows.length,
      },
    })
  }
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={closePreview}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={closePreview}
            aria-label="close"
            variant=""
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {filename}
          </Typography>

          <LoadingButton
            autoFocus
            color="inherit"
            onClick={ConfirmHandler}
            variant="outlined"
            endIcon={<Check />}
            sx={{ ml: 2 }}
            loading={confirming}
          >
            Confirm
          </LoadingButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ width: "95%", height: "90vh", mx: "auto", my: 2 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[20]}
          // checkboxSelection
          disableSelectionOnClick
        />
      </Box>
    </Dialog>
  )
}

export default PreviewFileModal
