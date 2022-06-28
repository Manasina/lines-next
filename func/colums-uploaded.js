const columns = (column) => {
  const keys = Object.keys(column)
  return keys.map((key) => {
    return {
      field: key,
      headerName: key,
      minWidth: 100,
    }
  })
}

export default columns
