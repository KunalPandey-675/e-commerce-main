import Footer from "../footer/Footer"
import Navbar from "../navbar/Navbar"


// eslint-disable-next-line react/prop-types
function Layout ({ children }) {
  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: '70px' }}>{children}</div>
      <Footer />
    </div>
  )
}

export default Layout
