import axios from "axios";
import type { Seguro } from "../models/Seguro";

const api = axios.create({
    baseURL:
        import.meta.env.MODE === "development"
            ? "http://localhost:4000"
            : "https://seguro-backend-f85t.onrender.com",
});

export const listarSeguros = async (token?: string) => {
    const config = token ? { headers: { Authorization: token } } : {};
    const resposta = await api.get<Seguro[]>("/seguros", config);
    return resposta.data;
};

export const atualizarSeguro = async (
    _id: number,
    dados: Partial<Seguro>,
    token: string
) => {
    const payload = {
        ...dados,
        categoria: dados.categoria
            ? { id: dados.categoria.id, nome: dados.categoria.nome, descricao: dados.categoria.descricao }
            : undefined,
        usuario: dados.usuario ? { id: dados.usuario.id } : null,
    };

    const resposta = await api.put<Seguro>(`/seguros`, payload, {
        headers: { Authorization: token },
    });
    return resposta.data;
};

export const criarSeguro = async (seguro: Seguro, token?: string): Promise<Seguro> => {
    const resposta = await api.post("/seguros", seguro, {
        headers: {
            Authorization: `${token}`,
        },
    });
    return resposta.data;
};

export async function buscarSegurosPorUsuario(usuarioId: number, token: string) {
    const resposta = await api.get(`/seguros/usuario/${usuarioId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return resposta.data;
}
