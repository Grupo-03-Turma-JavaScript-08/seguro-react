import {type ChangeEvent, type FormEvent, useContext, useEffect, useState} from "react";
import { FaLock, FaUser } from "react-icons/fa";
import loginImg from "../../assets/img/login.png";
import type UsuarioLogin from "../../models/UsuarioLogin.ts";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../contexts/AuthContext.tsx";
import {PropagateLoader} from "react-spinners";

export default function Login() {
    const navigate = useNavigate();

    const { usuario, handleLogin, isLoading } = useContext(AuthContext);

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({
        id: 0,
        nome: "",
        email: "",
        senha: "",
        token: "",
    });

    useEffect(() => {
        if (usuario.token !== "") {
            navigate("/");
        }
    }, [usuario, navigate]);

    function atualizarEstado(event: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [event.target.name]: event.target.value,
        });
    }

    async function login(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        await handleLogin({
            email: usuarioLogin.email,
            senha: usuarioLogin.senha,
        });
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-145px)] lg:h-[calc(100vh-145px)] bg-[#e0e5ec] overflow-hidden">
            <div className="hidden lg:flex lg:w-1/2 h-full">
                <img
                    src={loginImg}
                    alt="Viagem"
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="flex w-full lg:w-1/2 items-center justify-center p-6 lg:p-12">
                <div className="w-full max-w-md p-8 rounded-2xl bg-[#e0e5ec] shadow-[8px_8px_16px_#bec3cf,-8px_-8px_16px_#ffffff]">

                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-[inset_4px_4px_8px_#bec3cf,inset_-4px_-4px_8px_#ffffff]">
                                <FaUser className="text-2xl text-[#072B28]" />
                            </div>
                        </div>

                        <h2 className="text-xl font-semibold text-center text-[#072B28]">
                            Bem-vindo de volta
                        </h2>
                        <p className="text-sm text-center text-[#0F7C72] mb-6">
                            Faça login para continuar
                        </p>

                        <div className="flex items-center mb-4 px-4 py-3 rounded-lg bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#bec3cf,inset_-4px_-4px_8px_#ffffff]">
                            <FaUser className="text-[#0F7C72] mr-3" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Digite seu e-mail"
                                value={usuarioLogin.email}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                                className="w-full bg-transparent focus:outline-none"
                            />
                        </div>

                        <div className="flex items-center mb-4 px-4 py-3 rounded-lg bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#bec3cf,inset_-4px_-4px_8px_#ffffff]">
                            <FaLock className="text-[#0F7C72] mr-3" />
                            <input
                                type="password"
                                name={"senha"}
                                placeholder="Digite sua senha"
                                value={usuarioLogin.senha}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                                className="w-full bg-transparent focus:outline-none"
                            />
                        </div>

                        <form onSubmit={login}>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-12 mt-2 rounded-lg font-semibold text-white bg-[#256777] hover:bg-[#1d4f5d] shadow-md transition disabled:opacity-60 flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <PropagateLoader color="#ffffff" size={6} />
                                ) : (
                                    "Entrar"
                                )}
                            </button>
                        </form>

                        <p className="text-center text-sm mt-6 text-[#9499b7]">
                            Não tem uma conta?{" "}
                            <a href="/cadastro" className="text-[#0F7C72] font-semibold">
                                Cadastre-se
                            </a>
                        </p>
                    </div>
            </div>
        </div>
    );
}
