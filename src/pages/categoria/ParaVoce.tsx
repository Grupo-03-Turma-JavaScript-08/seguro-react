import React, { useState } from "react";
import ModalSeguro from "../../components/modal/ModalSeg"; // seu modal

interface PlanoProps {
    titulo: string;
    destaque?: string;
    beneficios: string[];
    cor: string;
    bgImg?: string; // imagem de fundo opcional
    onContratar: () => void;
}

const Plano: React.FC<PlanoProps> = ({
    titulo,
    destaque,
    beneficios,
    cor,
    bgImg,
    onContratar,
}) => {
    const [aberto, setAberto] = useState(false);

    return (
        <div
            className={`rounded-2xl w-80 min-h-[420px] flex flex-col justify-between text-white shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl`}
            style={
                bgImg
                    ? {
                        backgroundImage: `url(${bgImg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }
                    : {}
            }
        >
            <div
                className={`${bgImg ? "bg-black bg-opacity-60" : cor
                    } p-6 flex flex-col justify-between h-full`}
            >
                {destaque && (
                    <div className="border border-[#fa7143] text-[#fa7143] px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block mx-auto">
                        {destaque}
                    </div>
                )}

                {/* título + seta */}
                <button
                    className="flex items-center justify-between text-xl font-semibold w-full focus:outline-none"
                    onClick={() => setAberto(!aberto)}
                >
                    {titulo}
                    <span
                        className={`transform transition-transform ${aberto ? "rotate-180" : "rotate-0"
                            }`}
                    >
                        ▲
                    </span>
                </button>

                {/* benefícios expansíveis */}
                <div
                    className={`overflow-hidden transition-all duration-300 ${aberto ? "max-h-60 mt-4" : "max-h-0"
                        }`}
                >
                    <ul className="text-sm text-gray-200 space-y-2">
                        {beneficios.map((item, index) => (
                            <li key={index}>• {item}</li>
                        ))}
                    </ul>

                    <button
                        className="bg-white text-[#00332E] font-semibold  py-2 rounded-lg hover:bg-[#fa7143] hover:text-white transition"
                        onClick={onContratar}
                    >
                        Contratar agora
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function ParaVoce() {
    const [openModal, setOpenModal] = useState(false);
    const [planoSelecionado, setPlanoSelecionado] = useState<string | null>(null);

    return (
        <div className="flex flex-col items-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                <Plano
                    titulo="Anual"
                    destaque="Seguro + Vantajoso"
                    beneficios={[
                        "Ideal para quem viaja várias vezes no ano",
                        "Cobertura completa em todas as viagens",
                        "Assistência médica internacional",
                        "Proteção de bagagem e imprevistos",
                        "Melhor custo-benefício",
                    ]}
                    bgImg="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80" // praia
                    cor="bg-[#00332E]"
                    onContratar={() => {
                        setPlanoSelecionado("Anual");
                        setOpenModal(true);
                    }}
                />

                <Plano
                    titulo="Mensal"
                    destaque="Seguro + Prático"
                    beneficios={[
                        "Perfeito para viagens de curta duração",
                        "Contratação simples e rápida",
                        "Cobertura válida por 30 dias",
                        "Proteção contra imprevistos de saúde",
                        "Indicado para turismo e negócios",
                    ]}
                    bgImg="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=80" // avião
                    cor="bg-[#004A46]"
                    onContratar={() => {
                        setPlanoSelecionado("Mensal");
                        setOpenModal(true);
                    }}
                />

                <Plano
                    titulo="Temporada"
                    destaque="Seguro + Flexível"
                    beneficios={[
                        "Perfeito para viagens de curta duração",
                        "Contratação simples e rápida",
                        "Cobertura válida por 30 dias",
                        "Proteção contra imprevistos de saúde",
                        "Indicado para turismo e negócios",
                    ]}
                    bgImg="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=800&q=80" // viajante com mochila
                    cor="bg-[#005A55]"
                    onContratar={() => {
                        setPlanoSelecionado("Temporada");
                        setOpenModal(true);
                    }}
                />
            </div>

            {planoSelecionado && (
                <ModalSeguro
                    isOpen={openModal}
                    onClose={() => setOpenModal(false)}
                    plano={planoSelecionado}
                />
            )}
        </div>
    );
}
