import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/login/Login";
import Cadastro from "./pages/cadastro/Cadastro";
import Navbar from "./components/navbar/Navbar";

function App() {
    return (
        <BrowserRouter>
        <Navbar/>
            <Routes>
                {/* <Route path="/" element={<Home/>} /> */}
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
