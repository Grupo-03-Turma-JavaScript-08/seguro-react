import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import type { Usuario } from "../models/Usuario";
import type { Seguro } from "../models/Seguro";
import {
    atualizarUsuario,
    buscarUsuarioPorEmail,
    criarUsuario,
    deletarUsuario,
} from "../services/usuarioService";
import { listarSeguros, atualizarSeguro } from "../services/seguroService";
import { ToastAlerta } from "../utils/ToastAlerta";
import Modal from "../components/modal/ModalAdmin.tsx";
import { HiCheckCircle } from "react-icons/hi";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function gerarSenhaTemporaria(): string {
    return Math.random().toString(36).slice(-10);
}

const mensagens = {
    acessoNegado:
        "Acesso restrito. Apenas administradores podem visualizar esta página.",
    usuarioNaoEncontrado: "Nenhum usuário encontrado com o e-mail informado.",
};

export default function PerfilAdmin() {
    const { usuario: admin } = useContext(AuthContext);

    const [emailBusca, setEmailBusca] = useState("");
    const [debouncedEmail, setDebouncedEmail] = useState("");
    const [isLoadingBusca, setIsLoadingBusca] = useState(false);
    const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);
    const [isNewUser, setIsNewUser] = useState(false);
    const [usuarioNaoEncontrado, setUsuarioNaoEncontrado] = useState(false);
    const [formNome, setFormNome] = useState("");
    const [formEmail, setFormEmail] = useState("");
    const [isSalvando, setIsSalvando] = useState(false);
    const [showModalSenha, setShowModalSenha] = useState(false);
    const [isExcluindo, setIsExcluindo] = useState(false);
    const [showModalExcluir, setShowModalExcluir] = useState(false);

    const [showSeguros, setShowSeguros] = useState(false);
    const [listaSeguros, setListaSeguros] = useState<Seguro[]>([]);
    const [loadingSeguros, setLoadingSeguros] = useState(false);
    const [seguroEmAtualizacao, setSeguroEmAtualizacao] = useState<number | null>(null);

    const emailValido = useMemo(
        () => emailRegex.test(debouncedEmail),
        [debouncedEmail]
    );

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedEmail(emailBusca.trim());
        }, 400);

        return () => clearTimeout(timeout);
    }, [emailBusca]);

    useEffect(() => {
        if (isNewUser) {
            setFormEmail(debouncedEmail);
        }
    }, [debouncedEmail, isNewUser]);

    useEffect(() => {
        if (!debouncedEmail) {
            resetarUsuarioEncontrado();
            return;
        }

        if (!emailValido) {
            return;
        }

        if (!admin.token) {
            ToastAlerta("Token de autenticação ausente.", "erro");
            return;
        }

        let cancelado = false;
        setIsLoadingBusca(true);

        buscarUsuarioPorEmail(debouncedEmail, admin.token)
            .then((usuarioEncontrado) => {
                if (cancelado) return;
                setSelectedUser(usuarioEncontrado);
                setIsNewUser(false);
                setUsuarioNaoEncontrado(false);
                setFormNome(usuarioEncontrado.nome ?? "");
                setFormEmail(usuarioEncontrado.email);
                setShowSeguros(false);
                setListaSeguros([]);
            })
            .catch((erro) => {

                if (cancelado) return;

                if (axios.isAxiosError(erro) && erro.response?.status === 404) {
                    setSelectedUser(null);
                    setIsNewUser(false);
                    setUsuarioNaoEncontrado(true);
                    setFormNome("");
                    setFormEmail(debouncedEmail);
                    setShowSeguros(false);
                    setListaSeguros([]);
                } else {
                    const mensagem = axios.isAxiosError(erro)
                        ? erro.response?.data?.message ?? "Erro ao buscar usuário."
                        : "Erro ao buscar usuário.";
                    ToastAlerta(mensagem, "erro");
                }
            })
            .finally(() => {
                if (!cancelado) {
                    setIsLoadingBusca(false);
                }
            });

        return () => {
            cancelado = true;
        };
    }, [debouncedEmail, emailValido, admin.token]);

    function resetarUsuarioEncontrado() {
        setSelectedUser(null);
        setIsNewUser(false);
        setUsuarioNaoEncontrado(false);
        setFormNome("");
        setFormEmail("");
        setShowSeguros(false);
        setListaSeguros([]);
    }

    async function handleSalvar() {
        if (!emailValido) {
            ToastAlerta("Informe um e-mail válido antes de continuar.", "erro");
            return;
        }

        if (!admin.token) {
            ToastAlerta("Sessão inválida. Faça login novamente.", "erro");
            return;
        }

        if (isNewUser) {
            if (!formNome.trim()) {
                ToastAlerta("Preencha o nome para criar o usuário.", "erro");
                return;
            }

            setIsSalvando(true);
            const senhaTemporaria = gerarSenhaTemporaria();

            try {
                const criado = await criarUsuario({
                    nome: formNome.trim(),
                    email: formEmail,
                    senha: senhaTemporaria,
                    tipo: "CLIENTE"
                });

                ToastAlerta("Usuário criado com sucesso!", "sucesso");
                ToastAlerta(
                    "Um e-mail de alteração de senha será enviado automaticamente.",
                    "info"
                );

                setSelectedUser(criado);
                setIsNewUser(false);
                setFormNome(criado.nome ?? "");
                setFormEmail(criado.email);
            } catch (erro) {
                const mensagem = axios.isAxiosError(erro)
                    ? erro.response?.data?.message ?? "Erro ao criar usuário."
                    : "Erro ao criar usuário.";
                ToastAlerta(mensagem, "erro");
            } finally {
                setIsSalvando(false);
            }

            return;
        }

        if (!selectedUser) {
            ToastAlerta(
                "Busque um usuário antes de salvar as alterações.",
                "erro"
            );
            return;
        }

        setIsSalvando(true);

        try {
            await atualizarUsuario(
                {
                    id: selectedUser.id,
                    nome: formNome.trim(),
                    email: formEmail.trim(),
                    tipo: selectedUser.tipo,
                },
                admin.token
            );
            ToastAlerta("Dados atualizados com sucesso!", "sucesso");
        } catch (erro) {
            const mensagem = axios.isAxiosError(erro)
                ? erro.response?.data?.message ?? "Erro ao atualizar usuário."
                : "Erro ao atualizar usuário.";
            ToastAlerta(mensagem, "erro");
        } finally {
            setIsSalvando(false);
        }
    }

    async function handleExcluirUsuario() {
        if (!selectedUser || !admin.token) {
            return;
        }

        setIsExcluindo(true);
        try {
            await deletarUsuario(selectedUser.id!, admin.token);
            ToastAlerta("Usuário excluído com sucesso!", "sucesso");
            resetarUsuarioEncontrado();
            setEmailBusca("");
            setDebouncedEmail("");
            setShowModalExcluir(false);
        } catch (erro) {
            const mensagem = axios.isAxiosError(erro)
                ? erro.response?.data?.message ?? "Erro ao excluir usuário."
                : "Erro ao excluir usuário.";
            ToastAlerta(mensagem, "erro");
        } finally {
            setIsExcluindo(false);
        }
    }

    async function carregarSeguros() {
        if (!admin.token) {
            ToastAlerta("Sessão inválida. Faça login novamente.", "erro");
            return;
        }
        setLoadingSeguros(true);
        try {
            const dados = await listarSeguros(admin.token);
            setListaSeguros(dados);
        } catch (erro) {
            const mensagem = axios.isAxiosError(erro)
                ? erro.response?.data?.message ?? "Erro ao carregar seguros."
                : "Erro ao carregar seguros.";
            ToastAlerta(mensagem, "erro");
        } finally {
            setLoadingSeguros(false);
        }
    }

    async function atualizarSeguroDoUsuario(seguro: Seguro, vincular: boolean) {
        if (!admin.token || !selectedUser?.id || !seguro.id) {
            ToastAlerta("Informações insuficientes para atualizar o seguro.", "erro");
            return;
        }

        setSeguroEmAtualizacao(seguro.id);
        try {
            const resposta = await atualizarSeguro(
                seguro.id,
                {
                    ...seguro,
                    preco: Number(seguro.preco),
                    usuario: vincular
                        ? {
                              id: selectedUser.id,
                              nome: selectedUser.nome,
                              email: selectedUser.email,
                              tipo: selectedUser.tipo,
                          }
                        : null,
                },
                admin.token
            );

            setListaSeguros((lista) =>
                lista.map((item) => (item.id === resposta.id ? resposta : item))
            );

            ToastAlerta(
                vincular
                    ? "Seguro vinculado ao usuário com sucesso!"
                    : "Seguro desvinculado do usuário com sucesso!",
                "sucesso"
            );
        } catch (erro) {
            const mensagem = axios.isAxiosError(erro)
                ? erro.response?.data?.message ?? "Erro ao atualizar seguro."
                : "Erro ao atualizar seguro.";
            ToastAlerta(mensagem, "erro");
        } finally {
            setSeguroEmAtualizacao(null);
        }
    }

    function usuarioPossuiSeguro(seguro: Seguro) {
        return seguro.usuario?.id === selectedUser?.id;
    }

    if (admin.tipo !== "ADMIN") {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <h1 className="text-2xl font-bold text-[#072B28]">Área restrita</h1>
                <p className="text-gray-600">{mensagens.acessoNegado}</p>
            </div>
        );
    }

    const exibindoDados = Boolean(selectedUser || isNewUser);

    return (
        <div className="pb-16">
            <section className="rounded-2xl bg-[#0D6C63] text-white p-8 mb-10 shadow-lg flex justify-around">
                <span>
                    <h1 className="text-2xl font-semibold mb-2">Dados do colaborador</h1>
                    <p className="text-sm text-justify">
                        Nome do colaborador: <strong>{admin.nome}</strong>
                    </p>
                    <p className="text-sm text-justify">
                        E-mail corporativo: <strong>{admin.email}</strong>
                    </p>
                </span>
                <span>
                    <p className="text-sm mt-4 max-w-2xl">
                    Precisa atualizar informações ou falar com o departamento pessoal?
                    <br></br>
                    Entre em contato pelo e-mail <strong className="ml-1">dp@rotasegura.com.br</strong>
                </p>
                </span>                
            </section>

            <section className="grid gap-6 md:grid-cols-[minmax(320px,_1fr)_minmax(320px,_1fr)]">
                <div className={exibindoDados ? "" : "mx-auto max-w-xl text-center"}>
                    <h2 className="text-2xl font-bold text-[#072B28] mb-4">
                        Área administrativa
                    </h2>
                    <div className="flex flex-col items-center gap-4 mb-6">
                        <div className="w-full md:w-auto">
                            <label className="block text-sm font-medium text-[#072B28] mb-2 text-center">
                                E-mail do usuário
                            </label>
                            <input
                                type="email"
                                value={emailBusca}
                                onChange={(evento) => setEmailBusca(evento.target.value)}
                                placeholder="Digite o e-mail para buscar"
                                className="w-full md:w-[320px] px-4 py-3 rounded-lg border border-[#0D6C63]/40 focus:outline-none focus:ring-2 focus:ring-[#0D6C63]"
                            />
                        </div>

                        {usuarioNaoEncontrado && !isNewUser && (
                            <button
                                type="button"
                                onClick={() => {
                                    setIsNewUser(true);
                                    setUsuarioNaoEncontrado(false);
                                    setFormEmail(debouncedEmail);
                                    setFormNome("");
                                    setShowSeguros(false);
                                }}
                                disabled={!emailValido}
                                className="px-6 py-3 rounded-lg bg-[#FB7813] text-white font-semibold shadow-md hover:bg-[#e66a0d] transition disabled:opacity-60"
                            >
                                Criar usuário
                            </button>
                        )}
                    </div>
                    {isLoadingBusca && (
                        <p className={"text-sm text-gray-500 text-center"}>
                            Buscando informações do usuário...
                        </p>
                    )}
                    {!isLoadingBusca && usuarioNaoEncontrado && !isNewUser && (
                        <p className={"text-sm text-[#0D6C63] text-center"}>
                            {mensagens.usuarioNaoEncontrado}
                        </p>
                    )}
                </div>

                {(selectedUser || isNewUser) && (
                    <div className="rounded-2xl bg-[#f8fafc] border border-[#0D6C63]/20 p-6">
                        <div className="flex items-center justify-between mb-4 gap-4">
                            <h3 className="text-lg font-semibold text-[#072B28]">
                                Dados do cliente
                            </h3>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-[#072B28]">
                                    Nome
                                </label>
                                <input
                                    type="text"
                                    value={formNome}
                                    onChange={(evento) => setFormNome(evento.target.value)}
                                    placeholder="Nome completo"
                                    className="w-full px-4 py-3 rounded-lg bg-white border border-[#0D6C63]/20 focus:outline-none focus:ring-2 focus:ring-[#0D6C63]"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-[#072B28]">
                                    E-mail
                                </label>
                                <input
                                    type="email"
                                    value={formEmail}
                                    onChange={(evento) => setFormEmail(evento.target.value)}
                                    disabled={isNewUser || !selectedUser}
                                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#0D6C63] ${
                                        isNewUser ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                                    }`}
                                />
                            </div>
                            <div className=" items-center justify-center">
                                <label className="block text-sm font-medium text-[#072B28] mb-2">
                                    Senha
                                </label>
                                {isNewUser ? (
                                    <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-green-100 text-green-700">
                                        <HiCheckCircle className="h-5 w-5" />
                                        <span>E-mail de alteração será enviado automaticamente.</span>
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => setShowModalSenha(true)}
                                        disabled={!selectedUser}
                                        className="px-3 py-1 rounded-lg bg-[#FB7813] text-sm text-white font-semibold shadow-md hover:bg-[#e66a0d] transition disabled:opacity-60"
                                    >
                                        Solicitar alteração
                                    </button>
                                )}
                            </div>
                            <div className="flex items-center gap-3 justify-between">
                                {selectedUser && (
                                    <button
                                        type="button"
                                        onClick={async () => {
                                            if (!selectedUser) return;
                                            if (!showSeguros) {
                                                await carregarSeguros();
                                            }
                                            setShowSeguros((valor) => !valor);
                                        }}
                                        className="px-4 py-3 rounded-lg bg-[#0D6C63] text-white font-semibold shadow-md hover:bg-[#09524b] transition"
                                    >
                                        {showSeguros ? "Ocultar" : "Seguros do usuário"}
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={handleSalvar}
                                    disabled={isSalvando || (!selectedUser && !isNewUser)}
                                    className="px-6 py-3 rounded-lg bg-[#FB7813] text-white font-semibold shadow-md hover:bg-[#e66a0d] transition disabled:opacity-60"
                                >
                                    {isNewUser ? "Criar usuário" : "Salvar"}
                                </button>
                                {selectedUser && (
                                    <button
                                        type="button"
                                        onClick={() => setShowModalExcluir(true)}
                                        disabled={isExcluindo}
                                        className="px-6 py-3 rounded-lg bg-red-600 text-white font-semibold shadow-md hover:bg-red-700 transition disabled:opacity-60"
                                    >
                                        Excluir usuário
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </section>

            {showSeguros && selectedUser && (
                <section className="mt-8 rounded-2xl bg-white border border-[#0D6C63]/20 p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-[#072B28] mb-4">
                        Seguros disponíveis
                    </h3>

                    {loadingSeguros ? (
                        <p className="text-sm text-gray-500">Carregando seguros...</p>
                    ) : listaSeguros.length === 0 ? (
                        <p className="text-sm text-gray-600">Nenhum seguro cadastrado.</p>
                    ) : (
                        <div className="space-y-4">
                            {listaSeguros.map((seguro) => {
                                const contratado = usuarioPossuiSeguro(seguro);
                                const statusLabel = contratado ? "CONTRATADO" : "NÃO CONTRATADO";
                                const statusColor = contratado ? "text-green-600" : "text-gray-500";

                                return (
                                    <div
                                        key={seguro.id}
                                        className="flex flex-wrap items-center justify-between gap-4 border border-[#0D6C63]/15 rounded-xl px-4 py-3"
                                    >
                                        <div>
                                            <h4 className="text-base font-semibold text-[#072B28]">
                                                {seguro.nome}
                                            </h4>
                                            <p className={`text-sm ${statusColor}`}>{statusLabel}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    atualizarSeguroDoUsuario(seguro, !contratado)
                                                }
                                                disabled={seguroEmAtualizacao === seguro.id}
                                                className={`px-4 py-2 rounded-lg text-white font-semibold shadow-md transition disabled:opacity-60 ${
                                                    contratado
                                                        ? "bg-red-600 hover:bg-red-700"
                                                        : "bg-[#0D6C63] hover:bg-[#09524b]"
                                                }`}
                                            >
                                                {contratado ? "Anular" : "Contratar"}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </section>
            )}

            <Modal isOpen={showModalSenha} onClose={() => setShowModalSenha(false)}>
                <h2 className="text-lg font-semibold text-[#072B28] mb-4">
                    Enviar solicitação de alteração de senha
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                    Um e-mail será enviado para <strong>{formEmail}</strong> com as
                    instruções para redefinir a senha.
                </p>
                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => setShowModalSenha(false)}
                        className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            ToastAlerta(
                                "Solicitação registrada. O usuário receberá um e-mail para alterar a senha.",
                                "sucesso"
                            );
                            setShowModalSenha(false);
                        }}
                        className="px-4 py-2 rounded-lg bg-[#FB7813] text-white font-semibold hover:bg-[#e66a0d] transition"
                    >
                        Confirmar
                    </button>
                </div>
            </Modal>

            <Modal isOpen={showModalExcluir} onClose={() => setShowModalExcluir(false)}>
                <h2 className="text-lg font-semibold text-[#072B28] mb-4">
                    Confirmar exclusão de usuário
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                    Esta ação irá remover permanentemente o usuário{" "}
                    <strong>{selectedUser?.nome}</strong> ({selectedUser?.email}).
                    Deseja continuar?
                </p>
                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => setShowModalExcluir(false)}
                        className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={handleExcluirUsuario}
                        disabled={isExcluindo}
                        className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition disabled:opacity-60"
                    >
                        {isExcluindo ? 'Excluindo...' : 'Excluir'}
                    </button>
                </div>
            </Modal>
        </div>
    );
}
