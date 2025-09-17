import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import {PropagateLoader} from "react-spinners";
import { ToastAlerta } from "../../utils/ToastAlerta";
import cadastroImg from "../../assets/img/cadastro.png";
import axios from "axios";
import type { Usuario } from "../../models/Usuario";

export default function Cadastro() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [confirmarSenha, setConfirmarSenha] = useState<string>("");

    const [usuario, setUsuario] = useState<Usuario>({
        nome: "",
        email: "",
        senha: "",
        tipo: "CLIENTE",
    });

    function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value,
        });
    }

    function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value);
    }

    async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (confirmarSenha === usuario.senha && (usuario.senha?.length ?? 0) >= 8) {
            setIsLoading(true);
            try {
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { id: _id, seguros, ...usuarioSemId } = usuario;
                await axios.post("https://seguro-backend-f85t.onrender.com/usuarios", usuarioSemId);

                ToastAlerta("Usuário cadastrado com sucesso!", "sucesso");
                navigate("/login");
            } catch (error: any) {
                ToastAlerta(
                    error?.response?.data?.message ??
                    error?.message ??
                    "Erro ao cadastrar o usuário!",
                    "erro"
                );
                setUsuario({ ...usuario, senha: "" });
                setConfirmarSenha("");
            } finally {
                setIsLoading(false);
            }
        } else {
            ToastAlerta(
                "Dados do usuário inconsistentes! Verifique as informações do cadastro.",
                "erro"
            );
            setUsuario({ ...usuario, senha: "" });
            setConfirmarSenha("");
        }
    }

    function retornar() {
        navigate("/login");
    }

    return (
        <div className="h-screen w-full bg-[#e0e5ec] grid md:grid-cols-2 items-center justify-center p-8 gap-8">
            {/* Formulário */}
            <div className="w-full max-w-lg mx-auto rounded-2xl shadow-[8px_8px_16px_#bec3cf,-8px_-8px_16px_#ffffff] p-8 md:p-12 my-auto">
                <form onSubmit={cadastrarNovoUsuario} className="flex flex-col gap-4">
                    <h2 className="text-3xl font-bold text-center text-[#072B28]">
                        Criar Conta
                    </h2>
                    <p className="text-sm text-center text-[#333] mb-4">
                        Preencha os campos para se cadastrar
                    </p>

                    <input
                        type="text"
                        name="nome"
                        placeholder="Digite seu nome completo"
                        value={usuario.nome}
                        onChange={atualizarEstado}
                        className="w-full px-4 py-3 rounded-lg bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#bec3cf,inset_-4px_-4px_8px_#ffffff] focus:outline-none focus:ring-2 focus:ring-amber-500"
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Digite seu e-mail"
                        value={usuario.email}
                        onChange={atualizarEstado}
                        className="w-full px-4 py-3 rounded-lg bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#bec3cf,inset_-4px_-4px_8px_#ffffff] focus:outline-none focus:ring-2 focus:ring-amber-500"
                        required
                    />

                    <input
                        type="password"
                        name="senha"
                        placeholder="Digite sua senha (mínimo 8 caracteres)"
                        value={usuario.senha}
                        onChange={atualizarEstado}
                        minLength={8}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#bec3cf,inset_-4px_-4px_8px_#ffffff] focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />

                    <input
                        type="password"
                        name="confirmarSenha"
                        placeholder="Confirme sua senha"
                        value={confirmarSenha}
                        onChange={handleConfirmarSenha}
                        minLength={8}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#bec3cf,inset_-4px_-4px_8px_#ffffff] focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />

                    <div className="flex justify-between gap-4 mt-6">
                        <button
                            type="reset"
                            onClick={retornar}
                            disabled={isLoading}
                            className="w-1/2 py-3 rounded-lg font-semibold text-white bg-red-500 hover:bg-red-700 transition disabled:opacity-60"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-1/2 py-3 rounded-lg font-semibold text-white bg-amber-500 hover:bg-amber-600 shadow-md transition disabled:opacity-60 flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <PropagateLoader color="#ffffff" size={10} />
                            ) : (
                                "Cadastrar"
                            )}
                        </button>
                    </div>

                    <p className="text-center text-sm mt-6 text-[#333]">
                        Já tem uma conta?{" "}
                        <Link
                            to="/login"
                            className="text-[#072B28] font-semibold hover:underline"
                        >
                            Faça Login
                        </Link>
                    </p>
                </form>
            </div>

            <div className="hidden md:flex items-center justify-center w-full h-full rounded-2xl overflow-hidden">
                <img
                    src={cadastroImg}
                    alt="Ilustração de pessoa se cadastrando em um site"
                    className="w-full h-auto object-contain"
                />
            </div>
        </div>
    );
}
