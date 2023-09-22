import {BrowserRouter, Routes, Route} from "react-router-dom";

import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import {AuthProvider} from "./context/auth.js";
import Main from "./components/nav/Main.js";

function App() {
    return (
        <BrowserRouter>
            <Main />
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;