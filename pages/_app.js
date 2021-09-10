import '../styles/globals.css'
import 'antd/dist/antd.css'
import 'react-image-gallery/styles/css/image-gallery.css'

import { ThemeProvider } from '../components/Cart.js'

const MyApp = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
