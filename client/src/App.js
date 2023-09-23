import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/auth.js";
import Main from "./components/nav/Main.js";
import toast, { Toaster } from "react-hot-toast";
import ForgotPassword from "./pages/auth/ForgotPassword.js";

// pages
import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import AccountActivate from "./pages/auth/AccountActivate.js";
import AccessAccount from "./pages/auth/AccessAccount.js";
import Dashboard from "./pages/user/Dashboard.js";
import AdCreate from "./pages/user/ad/AdCreate.js";
import PrivateRoute from "./components/routes/PrivateRoute.js";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Main />
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/auth/account-activate/:token"
            element={<AccountActivate />}
          />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/auth/access-account/:token"
            element={<AccessAccount />}
          />
          {/* PrivateRoute has an <Outlet /> in it, so it can render the nested UI */}
          <Route path="/" element={<PrivateRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="ad/create" element={<AdCreate />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
