import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { atualizarUsuario, deletarUsuario } from "../services/usuarioService";
import perfilImg from "../assets/img/avatar.png";
import { ToastAlerta } from "../utils/ToastAlerta.ts";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export default function PerfilUsuario() {
    const { usuario, handleLogout } = useContext(AuthContext);

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("*****"); // começa mascarado
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

    const [confirmarDelete, setConfirmarDelete] = useState(false);

    // Atualiza os inputs quando o usuario mudar
    useEffect(() => {
        if (usuario) {
            setNome(usuario.nome || "");
            setEmail(usuario.email || "");
            setSenha("*****"); // exibe como mascarado
        }
    }, [usuario]);

    async function handleUpdate(e: React.FormEvent) {
        e.preventDefault();

        if (senha !== "*****" && senha !== confirmarSenha) {
            ToastAlerta("As senhas não coincidem!", "erro");
            return;
        }

        try {
            await atualizarUsuario(
                {
                    id: usuario.id,
                    nome,
                    email,
                    senha: senha === "*****" ? "" : senha, // só envia senha se for alterada
                },
                usuario.token
            );
            ToastAlerta("Conta atualizada com sucesso!", "sucesso");
        } catch {
            ToastAlerta("Erro ao atualizar conta!", "erro");
        }
    }

    async function handleDelete() {
        try {
            await deletarUsuario(usuario.id, usuario.token);
            ToastAlerta("Conta deletada com sucesso!", "sucesso");
            handleLogout();
        } catch {
            ToastAlerta("Erro ao deletar conta!", "erro");
        }
    }

    return (
        <div className="h-screen h-1/5 bg-[#e0e5ec] flex flex-col items-center justify-center p-8">
            <img
                src={perfilImg}
                alt="Foto de perfil"
                className="w-32 h-32 rounded-full object-cover shadow-md mb-4"
            />
            <h1 className="text-2xl font-bold text-[#072B28] mb-2">
                Perfil de <strong>{usuario?.nome}</strong>
            </h1>

            <form onSubmit={handleUpdate} className="flex flex-col gap-4 w-full max-w-md">
                {/* Nome */}
                <div className="flex items-center px-4 py-3 rounded-lg bg-[#e0e5ec]
                                shadow-[inset_4px_4px_8px_#bec3cf,inset_-4px_-4px_8px_#ffffff]">
                    <FaUser className="text-[#0F7C72] mr-3" />
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="w-full bg-transparent focus:outline-none"
                    />
                </div>

                {/* Email */}
                <div className="flex items-center px-4 py-3 rounded-lg bg-[#e0e5ec]
                                shadow-[inset_4px_4px_8px_#bec3cf,inset_-4px_-4px_8px_#ffffff]">
                    <FaUser className="text-[#0F7C72] mr-3" />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-transparent focus:outline-none"
                    />
                </div>

                {/* Senha */}
                <div className="flex items-center px-4 py-3 rounded-lg bg-[#e0e5ec]
                                shadow-[inset_4px_4px_8px_#bec3cf,inset_-4px_-4px_8px_#ffffff]">
                    <FaLock className="text-[#0F7C72] mr-3" />
                    <input
                        type={mostrarSenha ? "text" : "password"}
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        className="w-full bg-transparent focus:outline-none"
                    />
                    <button
                        type="button"
                        onClick={() => setMostrarSenha(!mostrarSenha)}
                        className="ml-2 text-[#0F7C72]"
                    >
                        {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>

                {/* Confirmar Senha */}
                <div className="flex items-center px-4 py-3 rounded-lg bg-[#e0e5ec]
                                shadow-[inset_4px_4px_8px_#bec3cf,inset_-4px_-4px_8px_#ffffff]">
                    <FaLock className="text-[#0F7C72] mr-3" />
                    <input
                        type={mostrarConfirmarSenha ? "text" : "password"}
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                        className="w-full bg-transparent focus:outline-none"
                    />
                    <button
                        type="button"
                        onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                        className="ml-2 text-[#0F7C72]"
                    >
                        {mostrarConfirmarSenha ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>

                <div className="flex justify-between gap-4 mt-6">
                    <button
                        type="button"
                        onClick={() => setConfirmarDelete(true)}
                        className="w-1/2 py-3 rounded-lg font-semibold text-white bg-red-500 hover:bg-red-700 transition"
                    >
                        Deletar
                    </button>
                    <button
                        type="submit"
                        className="w-1/2 py-3 rounded-lg font-semibold text-white bg-amber-500 hover:bg-amber-600 shadow-md transition"
                    >
                        Atualizar
                    </button>
                </div>
            </form>

            {confirmarDelete && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <p className="mb-4 text-lg font-semibold text-gray-700">
                            Tem certeza que deseja <span className="text-red-600">deletar</span> a conta?
                        </p>
                        <div className="flex gap-4 justify-end">
                            <button
                                onClick={() => setConfirmarDelete(false)}
                                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
