import axios from "axios";
import type {Categoria} from "../models/Categoria.ts";

const api = axios.create({
    baseURL: 'https://seguro-backend-f85t.onrender.com'
})

export const listarCategorias = async () => {
    const response = await api.get<Categoria[]>("/categorias");
    return response.data;
};

export const salvarCategoria = async (categoria: Categoria) => {
    const response = await api.post<Categoria>("/categorias", categoria);
    return response.data;
};

export const atualizarCategoria = async (id: number, categoria: Categoria) => {
    const response = await api.put<Categoria>(`/categorias/${id}`, categoria);
    return response.data;
};

export const deletarCategoria = async (id: number) => {
    await api.delete(`/categorias/${id}`);
};