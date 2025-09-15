import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Cadastro from "./pages/cadastro/Cadastro";
import Parceiro from "./pages/parceiro/Parceiro";
import Navbar from "./components/navbar/Navbar.tsx";
import Footer from "./components/footer/Footer.tsx";
// import PerfilAdmin from "./perfil/PerfilAdmin";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/parceiro" element={<Parceiro />} />
                {/*<Route path="/admin" element={<PerfilAdmin />} />*/}
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;

