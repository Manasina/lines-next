const columns = (column) => {
  const keys = Object.keys(column)
  return keys.map((key) => {
    return {
      field: key,
      headerName: key,
      minWidth: 150,
      hide: key === "id" ? true : false,
    }
  })
}

export default columns
