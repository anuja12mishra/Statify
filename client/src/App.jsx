import { Routes, Route} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from './pages/Dashboard';
import EmailVerifier from "./pages/EmailVerifier";
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        <Route
          path="/verify-email/:userId/:token"
          element={<EmailVerifier />}
        />
      </Routes>
    </>
  )
}

export default App
