import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Cadastro from "./pages/cadastro/Cadastro";
import Parceiro from "./pages/parceiro/Parceiro";
import Navbar from "./components/navbar/Navbar";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import Footer from "./components/footer/Footer";
import PerfilUsuario from "./perfil/PerfilUsuario";
import ParaVoce from "./pages/categoria/ParaVoce";
import PlanCards from "./pages/planosss/planos";
import PerfilAdmin from "./perfil/PerfilAdmin";

function AppContent() {
    const location = useLocation();
    const hideFooter = (location.pathname === "/login" || location.pathname === "/cadastro");

    const containerClasses = [
        "pt-[145px]",
        hideFooter ? "min-h-[calc(100vh-145px)]" : "min-h-[80vh]",
        hideFooter ? "px-0" : "px-[10%]",
    ].join(" ");

    return (
        <>
            <Navbar />
            <div className={containerClasses}>
                <ToastContainer />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route path="/parceiro" element={<Parceiro />} />
                    <Route path="/paravoce" element={<ParaVoce />} />
                    <Route path="/perfil" element={<PerfilUsuario />} />
                    <Route path="/planos" element={<PlanCards />} />
                    <Route path="/admin" element={<PerfilAdmin />} />
                </Routes>
            </div>
            {!hideFooter && <Footer />}
        </>
    );
}

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
