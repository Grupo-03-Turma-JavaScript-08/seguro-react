import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/login/Login";
import Cadastro from "./pages/cadastro/Cadastro";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                {/*<Route path="/home" element={<Home />} />*/}
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                {/*<Route path="/seguros" element={<SeguroList />} />*/}
                {/*<Route path="/seguros/novo" element={<SeguroForm />} />*/}
                {/*<Route path="/categorias" element={<CategoriaList />} />*/}
                {/*<Route path="/categorias/nova" element={<CategoriaForm />} />*/}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
