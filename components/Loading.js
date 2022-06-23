import { CircularProgress, Box } from "@mui/material"

export default function LoadingSheets() {
  return (
    <Box
      sx={{
        width: "80%",
        margin: "auto",
        height: "90vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  )
}
