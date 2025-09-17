import { useEffect, useState } from "react";
import { listarCategorias, deletarCategoria } from "../../services/categoriaService";
import type { Categoria } from "../../models/Categoria";
import { Link } from "react-router-dom";

function CategoriaList() {
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    const carregarCategorias = async () => {
        try {
            const dados = await listarCategorias();
            setCategorias(dados);
        } catch (error) {
            console.error("Erro ao carregar categorias:", error);
        }
    };

    const removerCategoria = async (id?: number) => {
        if (!id) return;
        if (confirm("Deseja realmente excluir esta categoria?")) {
            await deletarCategoria(id);
            carregarCategorias();
        }
    };

    useEffect(() => {
        carregarCategorias();
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Categorias</h1>

            <Link
                to="/categorias/nova"
                className="mb-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
            >
                Nova Categoria
            </Link>

            <table className="w-full bg-white rounded-lg shadow">
                <thead>
                <tr className="bg-gray-200 text-left">
                    <th className="p-3">ID</th>
                    <th className="p-3">Nome</th>
                    <th className="p-3">Descrição</th>
                    <th className="p-3">Ações</th>
                </tr>
                </thead>
                <tbody>
                {categorias.map((cat) => (
                    <tr key={cat.id} className="border-b">
                        <td className="p-3">{cat.id}</td>
                        <td className="p-3">{cat.nome}</td>
                        <td className="p-3">{cat.descricao}</td>
                        <td className="p-3 flex gap-2">
                            <Link
                                to={`/categorias/editar/${cat.id}`}
                                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                            >
                                Editar
                            </Link>
                            <button
                                onClick={() => removerCategoria(cat.id)}
                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Excluir
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default CategoriaList;