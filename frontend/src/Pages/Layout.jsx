import React from "react"
import Footer from "../Components/Layout/Footer"
import NavigationBar from "../Components/Layout/NavigationBar"
import Sidebar from "../Components/Layout/SideBar"

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <NavigationBar />
      <div className="flex flex-row w-full">
        <div className="flex-col">
          <Sidebar />
        </div>
        <div className="w-full h-screen">
          <main>{children}</main>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  )
}

export default Layout
