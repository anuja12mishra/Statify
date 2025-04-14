import { Routes, Route,Navigate} from "react-router-dom";
import Register from "./pages/RegisterPage";
import Login from "./pages/Login";
import Dashboard from './pages/Dashboard';
import EmailVerifier from "./pages/EmailVerifier";
import FAQ from "./pages/Faq";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ContactUs from "./pages/ContactUs";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
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
          path="/faq"
          element={<FAQ />}
        />
        <Route
          path="/privacy-policy"
          element={<PrivacyPolicy />}
        />
        <Route
          path="/terms-Of-service"
          element={<TermsOfService />}
        />
        <Route
          path="/verify-email/:userId/:token"
          element={<EmailVerifier />}
        />
        <Route
          path="/contact-us"
          element={<ContactUs />}
        />
        <Route
          path="/profile"
          element={<Profile />}
        />
        <Route
          path="/reset-pass"
          element={<ResetPassword />}
        />
      </Routes>
    </>
  )
}
export default App
