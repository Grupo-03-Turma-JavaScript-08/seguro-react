import axios from "axios";
import type UsuarioLogin from "../models/UsuarioLogin.ts";

const api = axios.create({
    baseURL: 'https://seguro-backend-f85t.onrender.com'
})

export const cadastrarUsuario = async (
    dados: { nome: string; email: string; senha: string },
    setDados: Function
) => {
    try {
        const resposta = await api.post("/usuarios", dados);
        setDados(resposta.data);
    } catch (error: any) {
        throw error.response?.data || error;
    }
};

export const login = async (
    dados: Pick<UsuarioLogin, "email" | "senha">,
    setDados: React.Dispatch<React.SetStateAction<UsuarioLogin>>
) => {
    const resposta = await api.post("/usuario/logar", dados);
    setDados(resposta.data as UsuarioLogin);
};

export const atualizarUsuario = async (dados: any, token: string) => {
    return await api.put("/usuarios", dados, {
        headers: { Authorization: token },
    });
};

export const deletarUsuario = async (id: number, token: string) => {
    return await api.delete(`/usuarios/${id}`, {
        headers: { Authorization: token },
    });
};

