import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#e0e5ec]">
            <div className="w-96 p-8 rounded-2xl bg-[#e0e5ec] shadow-[8px_8px_16px_#bec3cf,-8px_-8px_16px_#ffffff]">
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-[inset_4px_4px_8px_#bec3cf,inset_-4px_-4px_8px_#ffffff]">
                        <span className="text-2xl">👤</span>
                    </div>
                </div>

                <h2 className="text-xl font-semibold text-center text-[#3d4468]">Bem-vindo de volta</h2>
                <p className="text-sm text-center text-[#9499b7] mb-6">Faça login para continuar</p>

                <input
                    type="email"
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 mb-4 rounded-lg bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#bec3cf,inset_-4px_-4px_8px_#ffffff] focus:outline-none"
                />

                <input
                    type="password"
                    placeholder="Digite sua senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="w-full px-4 py-3 mb-4 rounded-lg bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#bec3cf,inset_-4px_-4px_8px_#ffffff] focus:outline-none"
                />

                <button
                    className="w-full py-3 rounded-lg font-semibold text-[#3d4468] bg-[#e0e5ec] shadow-[4px_4px_8px_#bec3cf,-4px_-4px_8px_#ffffff] hover:shadow-[inset_4px_4px_8px_#bec3cf,inset_-4px_-4px_8px_#ffffff] transition-all"
                >
                    Entrar
                </button>

                <p className="text-center text-sm mt-6 text-[#9499b7]">
                    Não tem uma conta? <a href="/cadastro" className="text-[#3d4468] font-semibold">Cadastre-se</a>
                </p>
            </div>
        </div>
    );
}
