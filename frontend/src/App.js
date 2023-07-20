import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"
import Dashboard from "./Pages/Dashboard"
import Register from "./Pages/Register"

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home title="HOMEPAGE" />} />
          <Route path="/dashboard" element={<Dashboard title="HOMEPAGE" />} />
          <Route path="/register" element={<Register title="HOMEPAGE" />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
