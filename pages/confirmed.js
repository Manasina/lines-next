import { useContext, useEffect, useState } from "react"
import Notification from "../components/Notification"
import { LoadingButton } from "@mui/lab"
import {
  Container,
  Autocomplete,
  TextField,
  Box,
  Typography,
  Button,
} from "@mui/material"
import FileContext from "../store/FileContext"
import Header from "../components/Header"
import { Send } from "@mui/icons-material"
function Uploading() {
  const [toast, setToast] = useState(false)
  const [notification, setNotification] = useState({
    content: "How are you?",
    severity: "info",
  })
  const { keysInUploaded, dataInUploaded } = useContext(FileContext)
  const [keys, setKeys] = useState([])
  const [isSending, setIsSending] = useState(false)
  const [matched, setMatched] = useState([])

  useEffect(() => {
    const handleGetKeys = async () => {
      const request = await fetch(`http://localhost:8000/keys/LFR`)
      const response = await request.json()
      setKeys(response)
    }
    handleGetKeys()
  }, [])

  const pushToDb = async (event) => {
    event.preventDefault()
    // const postFunc = await fetch("http://localhost:8000/uploadlignes", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ name: "how" }),
    // })
    // const response = await postFunc.json()
    // console.log(response)
    setIsSending(true)
    const match = matched.map((item, idx) => {
      const db_col = keys[idx].db_column
      return { [db_col]: item }
    })

    setIsSending(false)
  }
  const defaultProps = {
    options: keysInUploaded,
    getOptionLabel: (option) => option,
  }
  const Matching = (index) => (event, value) => {
    const matchedCopy = [...matched]
    matchedCopy[index] = value
    setMatched(matchedCopy)
  }
  return (
    <>
      <Header />
      <Container
        sx={{ maxWidth: 900, mx: "auto", my: 2, px: 3 }}
        component="form"
        onSubmit={pushToDb}
      >
        <Typography component="h3" variant="h6" sx={{ my: 1 }}>
          Colomns names
        </Typography>
        <Box component="ul">
          {keys.map(({ required, type, name, db_column }, index) => {
            return (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  my: 0.5,
                  justifyContent: "space-between",
                }}
                component="li"
                key={name}
              >
                <Typography component="h4" variant="body1">
                  {name}
                  {required ? (
                    <Typography color={"error"} component="span">
                      {"   *"}
                    </Typography>
                  ) : (
                    ""
                  )}
                </Typography>
                <Autocomplete
                  disablePortal
                  onChange={Matching(index)}
                  {...defaultProps}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Key" required={required} />
                  )}
                />
              </Box>
            )
          })}
          <Box sx={{ textAlign: "right", my: 1 }}>
            <LoadingButton
              type="submit"
              endIcon={<Send />}
              loading={isSending}
              variant="outlined"
            >
              Upload
            </LoadingButton>
          </Box>
        </Box>
      </Container>
      <Notification
        openToast={toast}
        setOpenToast={setToast}
        notification={notification}
        duration={1000}
      />
    </>
  )
}

export default Uploading
