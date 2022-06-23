import Header from "../../components/Header"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useState } from "react"
import LoadingSheets from "../../components/Loading"
import { CircularProgress, Box } from "@mui/material"

const Sheets = () => {
  const [charactersInfo, setCharactersInfo] = useState(null)
  const router = useRouter()
  const { disney_id, sheets_title } = router.query
  useEffect(() => {
    const GetDisneyCharactere = async () => {}
    GetDisneyCharactere()
  }, [disney_id])

  return (
    <>
      <Header />
      {charactersInfo === null ? <LoadingSheets /> : ""}
    </>
  )
}
export default Sheets
