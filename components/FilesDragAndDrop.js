import PropTypes from "prop-types"
import { Box, Typography } from "@mui/material"
import UploadFileIcon from "@mui/icons-material/UploadFile"

import { useRef, useEffect, useCallback } from "react"
import { grey } from "@mui/material/colors"
function FilesDragAndDrop({ onUpload }) {
  const drop = useRef(null)
  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
      e.stopPropagation()
      const { files } = e.dataTransfer

      if (files && files.length) {
        onUpload(files[0])
      }
    },
    [onUpload]
  )
  useEffect(() => {
    drop.current.addEventListener("dragover", handleDragOver)
    drop.current.addEventListener("drop", handleDrop)

    return () => {
      if (drop.current !== null) {
        drop.current.removeEventListener("dragover", handleDragOver)
        // eslint-disable-next-line react-hooks/exhaustive-deps
        drop.current.removeEventListener("drop", handleDrop)
      }
    }
  }, [handleDrop])

  return (
    <Box
      sx={{
        width: 300,
        height: 120,
        display: "grid",
        placeItems: "center",
        border: "1px solid grey",
        margin: "1rem",
        borderRadius: 5,
        bgcolor: grey[100],
      }}
      ref={drop}
    >
      <UploadFileIcon fontSize="large" />
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
