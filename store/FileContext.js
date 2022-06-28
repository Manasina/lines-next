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
    setData(newData)
    setXlsxKeys(Object.keys(newData[0]).sort())
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
