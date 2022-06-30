import { useContext, useEffect, useState } from "react"
import Notification from "../components/Notification"
import { LoadingButton } from "@mui/lab"
import {
  Container,
  Autocomplete,
  TextField,
  Box,
  Typography,
} from "@mui/material"
import FileContext from "../store/FileContext"
import Header from "../components/Header"
import { Send } from "@mui/icons-material"
const job_id = [
  "AD_PRES",
  "AD_VP",
  "AD_ASST",
  "FI_MGR",
  "FI_ACCOUNT",
  "AC_MGR",
  "AC_ACCOUNT",
  "SA_MAN",
  "SA_REP",
  "PU_MAN",
  "PU_CLERK",
  "ST_MAN",
  "ST_CLERK",
  "SH_CLERK",
  "IT_PROG",
  "MK_MAN",
  "MK_REP",
  "HR_REP",
  "PR_REP",
]
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
      const request = await fetch(`http://localhost:8000/table-keys/employees`)
      const response = await request.json()
      setKeys(response)
    }
    handleGetKeys()
  }, [])

  const pushToDb = async (event) => {
    event.preventDefault()
    setIsSending(true)
    const db_column = []
    const client_columns = []
    matched.forEach((item, idx) => {
      const db_col = keys[idx].db_column
      db_column.push(db_col)
      client_columns.push(item)
    })

    for (const datas of dataInUploaded) {
      const keys = db_column
      const values = client_columns.map((clcol) => datas[clcol])

      const postFunc = await fetch("http://localhost:8000/uploadlignes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keys: keys,
          values: values,
        }),
      })
      const response = await postFunc.json()
      console.log(response)
    }
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
          {keys.map(
            (
              {
                required,
                data_type,
                name,
                db_column,
                col_index,
                data_length,
                data_precision,
                data_scale,
              },
              index
            ) => {
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
            }
          )}
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
