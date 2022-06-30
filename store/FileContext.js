import { createContext, useState } from "react"

const FileContext = createContext({
  dataInUploaded: [],
  handleAddListData: (data) => {},
  keysInUploaded: [],
})

export const FileContextProvider = ({ children }) => {
  const [data, setData] = useState([])
  const [xlsxKeys, setXlsxKeys] = useState([])
  const handleAddListData = (newData) => {
    const sheetsKeys = Object.keys(newData[0])
      .filter((dat) => dat !== "id")
      .sort()
    setData(newData)
    setXlsxKeys(sheetsKeys)
  }
  return (
    <FileContext.Provider
      value={{
        dataInUploaded: data,
        handleAddListData: handleAddListData,
        keysInUploaded: xlsxKeys,
      }}
    >
      {children}
    </FileContext.Provider>
  )
}

export default FileContext
