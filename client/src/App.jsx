import { Routes, Route,Navigate} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from './pages/Dashboard';
import EmailVerifier from "./pages/EmailVerifier";
import FAQ from "./pages/Faq";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ContactUs from "./pages/ContactUs";
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
      </Routes>
    </>
  )
}
export default App
