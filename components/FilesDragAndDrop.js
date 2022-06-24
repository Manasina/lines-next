import PropTypes from "prop-types"
import { Box, Typography } from "@mui/material"
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle"
function FilesDragAndDrop({ onUpload }) {
  return (
    <Box
      sx={{
        width: 200,
        height: 100,
        display: "grid",
        placeItems: "center",
        border: "1px solid #000",
      }}
    >
      <ArrowDropDownCircleIcon fontSize="large" />
      <Typography component="h3" variant="body1">
        Drop File here
      </Typography>
    </Box>
  )
}

export default FilesDragAndDrop

FilesDragAndDrop.propTypes = {
  onUpload: PropTypes.func.isRequired,
}
