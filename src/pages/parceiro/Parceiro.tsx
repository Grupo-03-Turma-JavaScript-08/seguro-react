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
  <div className="w-full -mt-[20px] px-4 sm:px-6 md:px-10 py-10 sm:py-14 md:py-20">
    <div className="mx-auto w-full max-w-7xl flex flex-col md:flex-row items-stretch md:items-center justify-center gap-6 sm:gap-8 md:gap-12">

      {/* Card esquerdo (imagem) */}
      <div className="w-full md:w-[44%] h-auto sm:h-[360px] md:h-[650px] rounded-2xl overflow-hidden shadow-lg">
        <img
          src={parceiroImg}
          alt="Banner com logos dos parceiros da Rota Segura"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Card direito (formulário) */}
      <div className="w-full md:w-[56%] h-auto md:h-[650px] rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0D572D] mb-3 sm:mb-4 text-center">
            Seja Nosso Parceiro
          </h2>

          <div className="text-[#333] mb-4 sm:mb-5 text-left leading-relaxed space-y-2 text-sm sm:text-base">
            <p>
              <strong>Por que escolher a Rota Segura como seu parceiro estratégico?</strong>
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Soluções Abrangentes:</strong> Proteção que vai além do básico.</li>
              <li><strong>Atendimento de Excelência:</strong> Suporte dedicado 24/7.</li>
              <li><strong>Confiança e Credibilidade:</strong> Uma marca que se preocupa.</li>
              <li><strong>Diferencial Competitivo:</strong> Agregue um valor inestimável.</li>
            </ul>
            <p className="pt-1 sm:pt-2">
              Junte-se a nós e proporcione aos seus clientes a liberdade de explorar o mundo com a certeza de estarem sempre protegidos!
            </p>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleWhatsApp();
          }}
          className="space-y-3 sm:space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            <input
              id="nome"
              name="nome"
              type="text"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Nome completo"
              className="w-full px-4 py-2 rounded-lg bg-[#f8f9fa] shadow-[inset_1px_1px_3px_rgba(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
            <input
              id="empresa"
              name="empresa"
              type="text"
              value={formData.empresa}
              onChange={handleChange}
              placeholder="Empresa"
              className="w-full px-4 py-2 rounded-lg bg-[#f8f9fa] shadow-[inset_1px_1px_3px_rgba(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="E-mail"
              className="w-full px-4 py-2 rounded-lg bg-[#f8f9fa] shadow-[inset_1px_1px_3px_rgba(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
            <input
              id="telefone"
              name="telefone"
              type="tel"
              value={formData.telefone}
              onChange={handleChange}
              placeholder="(11) 99999-9999"
              className="w-full px-4 py-2 rounded-lg bg-[#f8f9fa] shadow-[inset_1px_1px_3px_rgba(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-amber-500"
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
            className="w-full px-4 py-2 rounded-lg bg-[#f8f9fa] shadow-[inset_1px_1px_3px_rgba(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />

          <textarea
            id="mensagem"
            name="mensagem"
            value={formData.mensagem}
            onChange={handleChange}
            placeholder="Proposta / mensagem..."
            rows={3}
            className="w-full px-4 py-2 rounded-lg resize-none bg-[#f8f9fa] shadow-[inset_1px_1px_3px_rgba(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-amber-500"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold text-white bg-amber-500 hover:bg-amber-600 shadow-[0_2px_6px_rgba(0,0,0,0.15)] transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-amber-500"
          >
            Quero ser um parceiro
          </button>
        </form>
      </div>
    </div>
  </div>
);

}