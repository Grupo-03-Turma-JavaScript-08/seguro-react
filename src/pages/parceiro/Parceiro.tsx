import { useState } from "react";
import parceiroImg from "../../assets/img/parceiro.png";

export default function Parceiro() {
    const [formData, setFormData] = useState({
        nome: "",
        empresa: "",
        email: "",
        telefone: "",
        cnpj: "",
        mensagem: "",
    });

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    function handleWhatsApp() {
        const numero = "5511999999999";
        const texto = `Olá, quero ser parceiro!
👤 *Nome:* ${formData.nome}
🏢 *Empresa:* ${formData.empresa}
📧 *Email:* ${formData.email}
📱 *Telefone:* ${formData.telefone}
🆔 *CNPJ:* ${formData.cnpj}
💬 *Mensagem:* ${formData.mensagem}`;

        const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
        window.open(url, "_blank");
    }

    return (
        <div className="-mt-[40px] w-full bg-[#e0e5ec] flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20 px-12 py-20">
            {/* Card esquerdo (imagem + título) */}
            <div className="w-full md:w-[35%] h-[600px] rounded-2xl overflow-hidden shadow-lg flex flex-col items-center">

                <img
                    src={parceiroImg}
                    alt="Banner com logos dos parceiros da Rota Segura"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Card direito (formulário) */}
            <div className="w-full md:w-[50%] h-[600px] bg-[#e0e5ec] rounded-2xl  p-6 md:p-8 flex flex-col justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-[#072B28] mb-3 text-center">
                        Seja Nosso Parceiro
                    </h2>
                    <div className="text-[#333] mb-5 text-left leading-relaxed space-y-2 text-sm">
                        <p>
                            <strong>Por que escolher a Rota Segura como seu parceiro estratégico?</strong>
                        </p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>
                                <strong>Soluções Abrangentes:</strong> Proteção que vai além do básico.
                            </li>
                            <li>
                                <strong>Atendimento de Excelência:</strong> Suporte dedicado 24/7.
                            </li>
                            <li>
                                <strong>Confiança e Credibilidade:</strong> Uma marca que se preocupa.
                            </li>
                            <li>
                                <strong>Diferencial Competitivo:</strong> Agregue um valor inestimável.
                            </li>
                        </ul>
                        <p className="pt-2">
                            Junte-se a nós e proporcione aos seus clientes a liberdade de explorar o mundo com a certeza de estarem sempre protegidos!
                        </p>
                    </div>
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleWhatsApp();
                    }}
                    className="space-y-3"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                            id="nome"
                            name="nome"
                            type="text"
                            value={formData.nome}
                            onChange={handleChange}
                            placeholder="Nome completo"
                            className="w-full px-4 py-2 rounded-lg bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#bec3cf,inset_-4px_-4px_8px_#ffffff] focus:outline-none focus:ring-2 focus:ring-amber-500"
                            required
                        />
                        <input
                            id="empresa"
                            name="empresa"
                            type="text"
                            value={formData.empresa}
                            onChange={handleChange}
                            placeholder="Empresa"
                            className="w-full px-4 py-2 rounded-lg bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#bec3cf,inset_-4px_-4px_8px_#ffffff] focus:outline-none focus:ring-2 focus:ring-amber-500"
                            required
                        />
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="E-mail"
                            className="w-full px-4 py-2 rounded-lg bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#bec3cf,inset_-4px_-4px_8px_#ffffff] focus:outline-none focus:ring-2 focus:ring-amber-500"
                            required
                        />
                        <input
                            id="telefone"
                            name="telefone"
                            type="tel"
                            value={formData.telefone}
                            onChange={handleChange}
                            placeholder="(11) 99999-9999"
                            className="w-full px-4 py-2 rounded-lg bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#bec3cf,inset_-4px_-4px_8px_#ffffff] focus:outline-none focus:ring-2 focus:ring-amber-500"
                            required
                        />
                    </div>

                    <input
                        id="cnpj"
                        name="cnpj"
                        type="text"
                        value={formData.cnpj}
                        onChange={handleChange}
                        placeholder="00.000.000/0001-00"
                        className="w-full px-4 py-2 rounded-lg bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#bec3cf,inset_-4px_-4px_8px_#ffffff] focus:outline-none focus:ring-2 focus:ring-amber-500"
                        required
                    />

                    <textarea
                        id="mensagem"
                        name="mensagem"
                        value={formData.mensagem}
                        onChange={handleChange}
                        placeholder="Proposta / mensagem..."
                        rows={3}
                        className="w-full px-4 py-2 rounded-lg resize-none bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#bec3cf,inset_-4px_-4px_8px_#ffffff] focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />

                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg font-semibold text-white bg-amber-500 hover:bg-amber-600 shadow-[4px_4px_8px_#bec3cf,-4px_-4px_8px_#ffffff] transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                    >
                        Quero ser um parceiro
                    </button>
                </form>
            </div>
        </div>
    );
}
