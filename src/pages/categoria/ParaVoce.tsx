import React, { useState } from "react";
import Modal from "../../components/modal/ModalSeg";

interface PlanoProps {
    titulo: string;
    preco?: string;
    descricaoPreco?: string;
    destaque?: string;
    beneficios: string[];
    cor: string;
    onContratar: () => void;
}

const Plano: React.FC<PlanoProps> = ({
                                         titulo,
                                         preco,
                                         descricaoPreco,
                                         destaque,
                                         beneficios,
                                         cor,
                                         onContratar,
                                     }) => {
    return (
        <div
            className={`rounded-2xl p-6 w-80 min-h-[420px] flex flex-col justify-between text-center text-white transition-all duration-300 transform hover:-translate-y-3 hover:shadow-xl ${cor}`}
        >
            {destaque && (
                <div className="border border-[#fa7143] text-[#fa7143] px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block mx-auto">
                    {destaque}
                </div>
            )}

            {preco && (
                <>
                    <h2 className="text-3xl font-bold text-[#fa7143]">{preco}</h2>
                    {descricaoPreco && (
                        <p className="text-xs text-gray-300 mb-2">{descricaoPreco}</p>
                    )}
                </>
            )}

            <h3 className="text-xl font-semibold mb-4">{titulo}</h3>

            <ul className="text-sm text-gray-200 space-y-2 mb-6">
                {beneficios.map((item, index) => (
                    <li key={index}>• {item}</li>
                ))}
            </ul>

            <button
                className="bg-white text-[#00332E] font-semibold px-4 py-2 rounded-lg hover:bg-[#fa7143] hover:text-white transition"
                onClick={onContratar}
            >
                Contratar agora
            </button>
        </div>
    );
};

export default function ParaVoce() {
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className="min-h-screen bg-[#e0e5ec] flex flex-col items-center justify-center p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Plano
                    titulo="Anual"
                    preco="R$ 1.900"
                    descricaoPreco="A partir de R$ 2.100,90"
                    destaque="Produto + Vantajoso"
                    beneficios={[
                        "Ideal para quem viaja várias vezes no ano",
                        "Cobertura completa em todas as viagens",
                        "Assistência médica internacional",
                        "Proteção de bagagem e imprevistos",
                        "Melhor custo-benefício",
                    ]}
                    cor="bg-[#00332E]"
                    onContratar={() => setOpenModal(true)}
                />

                <Plano
                    titulo="Mensal"
                    preco="R$ 200"
                    descricaoPreco="A partir de R$ 350"
                    beneficios={[
                        "Perfeito para viagens de curta duração",
                        "Contratação simples e rápida",
                        "Cobertura válida por 30 dias",
                        "Proteção contra imprevistos de saúde",
                        "Indicado para turismo e negócios",
                    ]}
                    cor="bg-[#004A46]"
                    onContratar={() => setOpenModal(true)}
                />

                <Plano
                    titulo="Temporada"
                    destaque="Produto + Flexível"
                    beneficios={[
                        "Perfeito para viagens de curta duração",
                        "Contratação simples e rápida",
                        "Cobertura válida por 30 dias",
                        "Proteção contra imprevistos de saúde",
                        "Indicado para turismo e negócios",
                    ]}
                    cor="bg-[#005A55]"
                    onContratar={() => setOpenModal(true)}
                />
            </div>

            <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
                <h2 className="text-lg font-bold mb-4">
                    Formulário de contratação do seguro
                </h2>
                <ul className="space-y-2 text-sm text-gray-700 mb-6">
                    <li>• nome:</li>
                    <li>• descricao: string;</li>
                    <li>• origem: string;</li>
                    <li>• destino: string;</li>
                    <li>• duracaoDias: number;</li>
                    <li>• preco: number;</li>
                    <li>• Preço total</li>
                </ul>
                <button className="bg-[#fa7143] text-white px-6 py-2 rounded-lg hover:bg-[#d95e2f] transition">
                    Assinar plano
                </button>
            </Modal>
        </div>
    );
}
