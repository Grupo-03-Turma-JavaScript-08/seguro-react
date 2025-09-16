import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Cadastro from "./pages/cadastro/Cadastro";
import Parceiro from "./pages/parceiro/Parceiro";
import Navbar from "./components/navbar/Navbar.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { ToastContainer } from "react-toastify";
import Footer from "./components/footer/Footer.tsx";
import PerfilUsuario from "./perfil/PerfilUsuario.tsx";
import ParaVoce from "./pages/categoria/ParaVoce.tsx";
import PlanCards from "./pages/planosss/planos.tsx";
// import PerfilAdmin from "./perfil/PerfilAdmin";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navbar />
                <div className="pt-[145px] px-[10%] min-h-[80vh]">
                    <ToastContainer />
                    <Routes>
                        <Route path="/" element={<Home />} />

                        <Route path="/login" element={<Login />} />
                        <Route path="/cadastro" element={<Cadastro />} />
                        <Route path="/parceiro" element={<Parceiro />} />
                        <Route path="/paravoce" element={<ParaVoce />} />
                        <Route path="/perfil" element={<PerfilUsuario />} />
                        {/* <Route path="/admin" element={<PerfilAdmin />} /> */}
                        <Route path="/planos" element={<PlanCards />} />

                    </Routes>
                </div>
                <Footer />
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
