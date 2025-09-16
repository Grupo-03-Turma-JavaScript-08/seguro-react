import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Categoria } from "../../models/Categoria";
import { salvarCategoria, atualizarCategoria, listarCategorias } from "../../services/categoriaService";

function CategoriaForm() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [categoria, setCategoria] = useState<Categoria>({
        nome: "",
        descricao: "",
    });

    useEffect(() => {
        const carregarCategoria = async () => {
            if (id) {
                const lista = await listarCategorias();
                const encontrada = lista.find((c) => c.id === Number(id));
                if (encontrada) setCategoria(encontrada);
            }
        };
        carregarCategoria();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCategoria({ ...categoria, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (id) {
                await atualizarCategoria(Number(id), categoria);
                alert("Categoria atualizada com sucesso!");
            } else {
                await salvarCategoria(categoria);
                alert("Categoria criada com sucesso!");
            }
            navigate("/categorias");
        } catch (error) {
            console.error("Erro ao salvar categoria:", error);
            alert("Ocorreu um erro.");
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
            >
                <h1 className="text-xl font-bold mb-4">{id ? "Editar Categoria" : "Nova Categoria"}</h1>

                <div className="mb-4">
                    <label className="block mb-1">Nome</label>
                    <input
                        type="text"
                        name="nome"
                        value={categoria.nome}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1">Descrição</label>
                    <textarea
                        name="descricao"
                        value={categoria.descricao}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    {id ? "Atualizar" : "Salvar"}
                </button>
            </form>
        </div>
    );
}

export default CategoriaForm;