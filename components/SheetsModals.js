import useMediaQuery from "@mui/material/useMediaQuery"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import Button from "@mui/material/Button"
import { useTheme } from "@mui/material/styles"
import { useEffect, useState } from "react"
import LoadingButton from "@mui/lab/LoadingButton"
import { Cancel, Download, Close as CloseIcon } from "@mui/icons-material"
import { AppBar, IconButton, Toolbar, Typography, Box } from "@mui/material"
import { write, utils } from "xlsx"
import { DataGrid } from "@mui/x-data-grid"

const Sheets = ({ open, resources, handleClose }) => {
  const { name, text, id } = resources
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"))
  const [isLoading, setIsLoading] = useState(true)
  const [info, setInfo] = useState([])
  const [isDownloading, setIsDownloading] = useState(false)
  const [page, setPage] = useState(0)
  useEffect(() => {
    if (!id) return
    setIsLoading(true)
    setInfo([])
    const getInfo = async () => {
      const character = await fetch(`http://localhost:8000/listes/${id}`)
      const data = await character.json()
      // willl remove the [data] to data when it become a list instead
      for (const information of [data]) {
        for (const [key, value] of Object.entries(information)) {
          if (value.constructor === Array) {
            data[key] = value.join(", ")
          }
        }
      }
      if (character.status === 200) {
        setIsLoading(false)
      } else {
        throw new Error("Response is not 200")
      }
      setInfo(
        [data].map((dat) => {
          return {
            ...dat,
            id: dat._id,
          }
        })
      )
    }
    getInfo()
  }, [id])
  const exportBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()

    setTimeout(() => {
      setIsDownloading(false)
      URL.revokeObjectURL(url)
    })
  }
  const handleDownload = () => {
    setIsDownloading(true)
    const workSave = utils.json_to_sheet(info)
    const workBook = { Sheets: { data: workSave }, SheetNames: ["data"] }
    const excelBuffer = write(workBook, { bookType: "xlsx", type: "array" })
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    })
    exportBlob(data, `${info.name}.xlsx`)
    handleClose()
  }
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
      {fullScreen ? (
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sheets
            </Typography>
          </Toolbar>
        </AppBar>
      ) : (
        ""
      )}
      <DialogTitle id="responsive-dialog-title">
        {name} -- {text}
      </DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>
        <Box sx={{ width: "100%", height: "50vh" }}>
          <DataGrid
            loading={isLoading}
            columns={[
              { field: "name", flex: 1 },
              { field: "films", flex: 1 },
              { field: "shortFilms", flex: 1 },
              { field: "url", flex: 1 },
            ]}
            rows={info}
            rowCount={100}
            page={page}
            pageSize={20}
            paginationMode="server"
            onPageChange={(newPage) => setPage(newPage)}
            rowsPerPageOptions={[20]}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} startIcon={<Cancel />}>
          Cancel
        </Button>
        <LoadingButton
          onClick={handleDownload}
          autoFocus
          startIcon={<Download />}
          loading={isDownloading}
        >
          Download
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default Sheets
