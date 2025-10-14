import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { atualizarUsuario, deletarUsuario } from "../services/usuarioService";
import perfilImg from "../assets/img/avatar.png";
import { ToastAlerta } from "../utils/ToastAlerta.ts";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { buscarSegurosPorUsuario } from "../services/seguroService.ts";
import type { Seguro } from "../models/Seguro";

export default function PerfilUsuario() {
    const { usuario, handleLogout } = useContext(AuthContext);

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("*****");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

    const [confirmarDelete, setConfirmarDelete] = useState(false);
    const [seguros, setSeguros] = useState<Seguro[]>([]);

    useEffect(() => {
        if (usuario) {
            setNome(usuario.nome || "");
            setEmail(usuario.email || "");
            setSenha("*****");
        }
    }, [usuario]);

    useEffect(() => {
        async function carregarSeguros() {
            try {
                const resposta = await buscarSegurosPorUsuario(usuario.id, usuario.token);
                setSeguros(resposta);
            } catch {
                console.error("Erro ao buscar seguros contratados");
            }
        }

        if (usuario?.id) {
            carregarSeguros();
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
                    senha: senha === "*****" ? "" : senha,
                    tipo: usuario.tipo,
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
        <div className="-mt-[120px] min-h-screen bg-[#e0e5ec] flex items-center justify-center">
            <div className="flex w-full max-w-8xl bg-[#e0e5ec]">
                {/* Coluna esquerda */}
                <div className="flex flex-col items-center justify-center w-1/2 p-8 border-r border-gray-300">
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
                        <div className="flex items-center px-4 py-3 rounded-lg bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#bec3cf,inset_-4px_-4px_8px_#ffffff]">
                            <FaUser className="text-[#0F7C72] mr-3" />
                            <input
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                className="w-full bg-transparent focus:outline-none"
                            />
                        </div>

                        {/* Email */}
                        <div className="flex items-center px-4 py-3 rounded-lg bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#bec3cf,inset_-4px_-4px_8px_#ffffff]">
                            <FaUser className="text-[#0F7C72] mr-3" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent focus:outline-none"
                            />
                        </div>

                        {/* Senha */}
                        <div className="flex items-center px-4 py-3 rounded-lg bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#bec3cf,inset_-4px_-4px_8px_#ffffff]">
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
                        <div className="flex items-center px-4 py-3 rounded-lg bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#bec3cf,inset_-4px_-4px_8px_#ffffff]">
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

                        {/* Botões */}
                        <div className="flex justify-between gap-4 mt-6">
                            <button
                                type="button"
                                onClick={() => setConfirmarDelete(true)}
                                className="w-1/2 py-3 rounded-lg font-semibold text-white bg-[#FB7813] hover:bg-amber-600 transition"
                            >
                                Deletar
                            </button>
                            <button
                                type="submit"
                                className="w-1/2 py-3 rounded-lg font-semibold text-white bg-[#072B28] hover:bg-[#0F7C72] shadow-md transition"
                            >
                                Atualizar
                            </button>
                        </div>
                    </form>
                </div>

                {/* Coluna direita */}
                <div className="flex flex-col items-center justify-start w-1/2 p-12 overflow-y-auto">
                    <h2 className="text-3xl font-bold text-[#072B28] mb-8">
                        Seguros Contratados
                    </h2>

                    <div className="bg-[#e0e5ec] shadow-[8px_8px_16px_#bec3cf,-8px_-8px_16px_#ffffff] rounded-2xl p-8 text-center w-full max-w-2xl">
                        {seguros.length > 0 ? (
                            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
                                {seguros.map((seguro) => (
                                    <div
                                        key={seguro.id}
                                        className="relative bg-white rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-[#dce1e7] hover:scale-[1.02] transition-transform"
                                    >
                                        {/* Badge tipo */}
                                        <div className="mb-2">
                      <span className={`px-3 py-1 text-xs rounded-full font-semibold ${
                          seguro.nome === "Internacional"
                              ? "bg-[#0F7C72]/10 text-[#0F7C72]"
                              : "bg-[#FA7143]/10 text-[#FA7143]"
                      }`}>
                        {seguro.nome}
                      </span>
                                        </div>

                                        {/* Descrição */}
                                        <h3 className="text-xl font-bold text-[#072B28] mb-3">
                                            {seguro.descricao}
                                        </h3>

                                        {/* Detalhes */}
                                        <div className="text-sm text-gray-700 space-y-1">
                                            <p><span className="font-semibold">Origem:</span> {seguro.origem}</p>
                                            <p><span className="font-semibold">Destino:</span> {seguro.destino}</p>
                                            <p><span className="font-semibold">Duração:</span> {seguro.duracaoDias} dia(s)</p>
                                        </div>

                                        {/* Preço */}
                                        <p className="mt-4 text-lg font-semibold text-[#FA7143]">
                                            Valor total: R$ {Number(seguro.preco).toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12">
                                <p className="text-gray-600 mb-3 text-sm">
                                    Você ainda não possui nenhum seguro contratado.
                                </p>
                                <NavLink
                                    to="/paravoce"
                                    className="text-[#FA7143] font-semibold hover:underline"
                                >
                                    Clique aqui e contrate agora!
                                </NavLink>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal de confirmação de exclusão */}
            {confirmarDelete && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <p className="mb-4 text-lg font-semibold text-gray-700">
                            Tem certeza que deseja{" "}
                            <span className="text-red-600">deletar</span> a conta?
                        </p>
                        <div className="flex gap-4 justify-end">
                            <button
                                onClick={() => setConfirmarDelete(false)}
                                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                            >
                                Cancelar
                            </button>
                            <NavLink
                                to="/"
                                onClick={handleDelete}
                                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                            >
                                Confirmar
                            </NavLink>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
