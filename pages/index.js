import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import HeroImage from "../assets/report.svg"
import { useState, useRef, forwardRef, useEffect } from "react"
import Image from "next/image"
import Header from "../components/Header"
import { ArrowUpward, Upload } from "@mui/icons-material"
import FilesDragAndDrop from "../components/FilesDragAndDrop"
import Fab from "@mui/material/Fab"
// import AreYouSure from "../components/AreYouSure"
import Notification from "../components/Notification"
import { utils, read } from "xlsx"
import colums from "../func/colums-uploaded"
import { v4 } from "uuid"
import PreviewFileModal from "../components/previewFileModal"
import { grey } from "@mui/material/colors"
export default function HeroCentered() {
  const [file, setFile] = useState(null)
  const [excelToArray, setExcelToArray] = useState([])
  const [thereIsAfile, setThereIsAfile] = useState(false)
  const [openToast, setOpenToast] = useState(false)
  const [notification, setNotification] = useState({
    severity: "success",
    content: "message",
  })
  const uploadButtonRef = useRef()
  // const [open, setOpen] = useState(false)
  // const [type, setType] = useState("Create")

  useEffect(() => {
    if (file === null) {
      setThereIsAfile(false)
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      const data = e.target.result
      const workbook = read(data, { type: "array" })
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]
      const json = utils.sheet_to_json(worksheet)
      setExcelToArray(
        json.map((js) => {
          return {
            ...js,
            id: v4(),
          }
        })
      )
      setThereIsAfile(true)
    }
    reader.readAsArrayBuffer(file)
  }, [file])
  const handleChoseFile = (type) => () => {
    console.log("Why aint it click?")
    uploadButtonRef.current.click()
    // setType(type)
    // setTimeout(() => setOpen(true), 2000)
  }
  const handleFileChange = (event) => {
    if (!event.target.files[0].name.endsWith(".xlsx")) {
      setOpenToast(true)
      setNotification({
        severity: "error",
        content: "File should be xlsx",
      })
      return
    }
    setFile(event.target.files[0])
  }
  const onUpload = (file) => {
    if (!file.name.endsWith(".xlsx")) {
      setOpenToast(true)
      setNotification({
        severity: "error",
        content: "File should be xlsx",
      })
      return
    }
    setFile(file)
  }
  /*
  const handleClose = () => setOpen(false)
  const postFile = async () => {
    if (file === null || file === undefined) {
      setOpenToast(true)
      setNotification({
        severity: "error",
        content: "No file",
      })
      return
    }
    const xlsxFile = new FormData()
    xlsxFile.append("in_file", file)
    const response = await fetch(`http://localhost:8000/uploadxlsx/${type}`, {
      method: "POST",
      body: xlsxFile,
    })
    const res = await response.json()
    setOpenToast(true)
    setNotification({
      severity: "success",
      content: res.Result,
    })

  }
  */
  const closePreviewHandler = () => {
    setThereIsAfile(false)
  }
  const handleShowCurrent = () => {
    if (file !== null) {
      setThereIsAfile(true)
    } else {
      setOpenToast(true)
      setNotification({
        severity: "error",
        content: "No uploaded yet",
      })
    }
  }

  return (
    <>
      <Header />
      {thereIsAfile && (
        <PreviewFileModal
          open={thereIsAfile}
          closePreview={closePreviewHandler}
          rows={excelToArray}
          columns={colums(excelToArray[0])}
          filename={file.name}
        />
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          mx: "auto",
          py: 2,
          overflow: "hidden",
        }}
      >
        <Typography variant="h3" component="h1">
          Upload XLSX here
        </Typography>

        <Typography
          color="text.secondary"
          variant="subtitle1"
          component="div"
          sx={{ mt: 2 }}
        >
          Update or create new file in t he database. her you upload file to
          create a new table or update xlsx.
        </Typography>
        <input
          type="file"
          id="avatar"
          name="avatar"
          accept=".xlsx"
          ref={uploadButtonRef}
          onChange={handleFileChange}
        ></input>
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button
            size="large"
            variant="contained"
            endIcon={<Upload />}
            onClick={handleChoseFile("upload")}
          >
            Upload
          </Button>
          <Fab
            color="secondary"
            aria-label="show modal"
            onClick={handleShowCurrent}
          >
            <ArrowUpward />
          </Fab>
        </Stack>
        <FilesDragAndDrop onUpload={onUpload} />
        {/* <Paper
          sx={{
            width: "80%",
            flexGrow: 1,
            maxHeight: 500,
            minHeight: 150,
            position: "relative",
          }}
          elevation={1}
        >
          <Image alt="hero" src={HeroImage} layout="responsive" priority />
        </Paper> */}
      </Box>
      {/* <AreYouSure
        open={open}
        handleClose={handleClose}
        type={type}
        file={file}
        postFile={postFile}
      /> */}
      <Notification
        openToast={openToast}
        setOpenToast={setOpenToast}
        notification={notification}
      />
    </>
  )
}
