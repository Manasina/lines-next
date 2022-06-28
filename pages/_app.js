import "../styles/globals.sass"
import { FileContextProvider } from "../store/FileContext"

function MyApp({ Component, pageProps }) {
  return (
    <FileContextProvider>
      <Component {...pageProps} />
    </FileContextProvider>
  )
}

export default MyApp
