import { uuid } from "uuidv4"

const columns = (column) => {
  const keys = Object.keys(column)
  return keys.map((key) => {
    return {
      field: key,
      headerName: key,
      minWidth: 100,
      editable: true,
    }
  })
}

export default columns
