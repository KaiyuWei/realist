import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/auth.js";
import Main from "./components/nav/Main.js";
import toast, { Toaster } from "react-hot-toast";

// pages
import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import AccountActivate from "./pages/auth/AccountActivate.js";

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
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
