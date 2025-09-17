import axios from "axios";
import type { Dispatch, SetStateAction } from "react";
import type UsuarioLogin from "../models/UsuarioLogin";
import type { Usuario, UsuarioTipo } from "../models/Usuario";

const api = axios.create({
    baseURL: "https://seguro-backend-f85t.onrender.com",
});

export type UsuarioLoginResponse = Omit<UsuarioLogin, "senha"> &
    Partial<Pick<UsuarioLogin, "senha" | "tipo">>;

export const cadastrarUsuario = async (
    dados: { nome: string; email: string; senha: string },
    setDados: Dispatch<SetStateAction<Usuario>>
) => {
    try {
        const resposta = await api.post("/usuarios", dados);
        setDados(resposta.data);
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data || error;
        }
        throw error;
    }
};

export const login = async (
    dados: Pick<UsuarioLogin, "email" | "senha">
) => {
    const resposta = await api.post("/usuario/logar", dados);
    return resposta.data as UsuarioLoginResponse;
};

export const atualizarUsuario = async (
    dados: Partial<Usuario>,
    token: string
) =>
    api.put<Usuario>("/usuarios", dados, {
        headers: { Authorization: token },
    });

export const deletarUsuario = async (id: number, token: string) =>
    api.delete(`/usuarios/${id}`, {
        headers: { Authorization: token },
    });

export const buscarUsuarioPorToken = async (token: string, id: number) => {
    const resposta = await api.get<Usuario>(`/usuarios/${String(id)}`, {
        headers: { Authorization: token },
    });
    return resposta.data;
};

export const buscarUsuarioPorEmail = async (email: string, token: string) => {
    const resposta = await api.get<Usuario>(
        `/usuarios/email/${encodeURIComponent(email).replace("%40", "@")}`,
        {
            headers: { Authorization: token },
        }
    );

    return resposta.data;
};

export const criarUsuario = async (
    dados: { nome: string; email: string; senha: string; tipo?: UsuarioTipo }
) => {
    const resposta = await api.post<Usuario>("/usuarios", dados);
    return resposta.data;
};
