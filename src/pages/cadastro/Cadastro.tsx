import { useState } from "react";
import axios from "axios";
import { ToastAlerta } from "../../utils/ToastAlerta";
import cadastroImg from "../../assets/img/cadastro.png";
import { Link } from "react-router-dom";

export default function Cadastro() {
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        senha: "",
        confirmarSenha: "",
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    async function handleCadastro(e: React.FormEvent) {
        e.preventDefault();

        if (formData.senha !== formData.confirmarSenha) {
            ToastAlerta("As senhas não conferem!", "erro");
            return;
        }

        if (formData.senha.length < 8) {
            ToastAlerta("A senha deve ter no mínimo 8 caracteres.", "info");
            return;
        }

        try {
            await axios.post("http://localhost:4000/usuario", {
                nome: formData.nome,
                email: formData.email,
                senha: formData.senha,
            });
            ToastAlerta("Usuário cadastrado com sucesso!", "sucesso");
        } catch (err: any) {
            ToastAlerta(err.response?.data?.message || "Erro ao cadastrar usuário.", "erro");
        }
    }

    return (
        <div className="min-h-screen w-full bg-[#e0e5ec] flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 p-8">

            <div className="w-full max-w-lg rounded-2xl shadow-[8px_8px_16px_#bec3cf,-8px_-8px_16px_#ffffff] p-8 md:p-12">
                <form onSubmit={handleCadastro} className="w-full">
                    <h2 className="text-3xl font-bold text-center text-[#072B28]">
                        Criar Conta
                    </h2>
                    <p className="text-sm text-center text-[#333] mb-8">
                        Preencha os campos para se cadastrar
                    </p>

                    <div className="space-y-4">
                        <input
                            type="text"
                            name="nome"
                            placeholder="Digite seu nome completo"
                            value={formData.nome}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#bec3cf,inset_-4px_-4px_8px_#ffffff] focus:outline-none focus:ring-2 focus:ring-amber-500"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Digite seu e-mail"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#bec3cf,inset_-4px_-4px_8px_#ffffff] focus:outline-none focus:ring-2 focus:ring-amber-500"
                            required
                        />
                        <input
                            type="password"
                            name="senha"
                            placeholder="Digite sua senha"
                            value={formData.senha}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#bec3cf,inset_-4px_-4px_8px_#ffffff] focus:outline-none focus:ring-2 focus:ring-amber-500"
                            required
                        />
                        <input
                            type="password"
                            name="confirmarSenha"
                            placeholder="Confirme sua senha"
                            value={formData.confirmarSenha}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#bec3cf,inset_-4px_-4px_8px_#ffffff] focus:outline-none focus:ring-2 focus:ring-amber-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 mt-8 rounded-lg font-semibold text-white bg-amber-500 hover:bg-amber-600 shadow-[4px_4px_8px_#bec3cf,-4px_-4px_8px_#ffffff] transition-all text-lg"
                    >
                        Cadastrar
                    </button>

                    <p className="text-center text-sm mt-6 text-[#333]">
                        Já tem uma conta?{" "}
                        <Link to="/login" className="text-[#072B28] font-semibold hover:underline">
                            Faça Login
                        </Link>
                    </p>
                </form>
            </div>

            <div className="hidden md:block w-full md:w-[45%] rounded-2xl overflow-hidden ">
                <img
                    src={cadastroImg}
                    alt="Ilustração de pessoa se cadastrando em um site"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
}