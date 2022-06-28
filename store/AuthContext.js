import { createContext } from "react"

const AuthContext = createContext()

export const AuthContextProfider = ({ children }) => {
  return <AuthContext.Provider>{children}</AuthContext.Provider>
}

export default AuthContext
