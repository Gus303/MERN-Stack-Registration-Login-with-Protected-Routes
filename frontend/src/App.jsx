import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router'
import Root from './utils/Root'
import Login from './pages/Login'
import ProtectedRoutes from './utils/ProtectedRoutes'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/admin/dashboard" element={<ProtectedRoutes requireRole={"admin"}><h1>Admin dashboard</h1></ProtectedRoutes>} />
        <Route path="/customer/dashboard" element={<h1>customer dashboard</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<p>Unauthorized</p>} />
      </Routes>
    </Router>
  )
}

export default App
