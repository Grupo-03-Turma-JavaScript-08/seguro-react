import React, { useState } from "react";
import { FaPlaneDeparture } from "react-icons/fa";
import ModalSeguro from "../../components/modal/ModalSeg";

interface PlanoProps {
    titulo: string;
    destaque?: string;
    beneficios: string[];
    bgImg?: string;
    onContratar: () => void;
}

const Plano: React.FC<PlanoProps> = ({
    titulo,
    destaque,
    beneficios,
    bgImg,
    onContratar,
}) => {
    const [aberto, setAberto] = useState(false);

    return (
        <div
            onClick={() => setAberto(!aberto)}
            className="relative w-80 min-h-[460px] rounded-3xl overflow-hidden cursor-pointer group
            transition-all duration-700 ease-out hover:scale-[1.03] hover:shadow-[0_16px_50px_rgba(0,0,0,0.25)]
            border border-white/10 bg-[#0d1d1c]/20 backdrop-blur-sm hover:border-[#fa7143]/30"
            style={{
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0.7)), url(${bgImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Overlay com gradiente refinado */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80 opacity-80 group-hover:opacity-90 transition-opacity duration-700" />

            {/* Borda iluminada no hover */}
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-tr from-[#fa7143]/25 via-transparent to-[#ffffff1a] opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-700" />

            <div className="relative z-10 flex flex-col justify-between h-full p-6 text-white">
                {/* Tag destaque */}
                {destaque && (
                    <span className="self-center text-xs font-semibold text-[#fa7143] border border-[#fa7143]/70
                px-3 py-1 rounded-full mb-4 bg-black/30 backdrop-blur-sm shadow-sm group-hover:scale-105
                transition-transform duration-300 animate-pulse">
                        {destaque}
                    </span>
                )}

                {/* Ícone e título */}
                <div className="text-center mb-3">
                    <FaPlaneDeparture
                        className="text-[#fa7143] text-4xl mx-auto mb-3 opacity-90
                      drop-shadow-[0_0_6px_rgba(250,113,67,0.3)]
                      group-hover:drop-shadow-[0_0_12px_rgba(250,113,67,0.6)]
                      transition-all duration-500"
                    />
                    <h2 className="text-2xl font-bold tracking-wide drop-shadow-lg text-white/95">
                        {titulo}
                    </h2>
                </div>

                {/* Benefícios (revelar ao abrir) */}
                <div
                    className={`transition-all duration-700 ease-in-out overflow-hidden ${aberto
                            ? "max-h-96 mt-4 opacity-100 translate-y-0"
                            : "max-h-0 opacity-0 translate-y-8"
                        }`}
                >
                    <ul className="text-sm text-gray-200 space-y-2 mt-2">
                        {beneficios.map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                                <span className="text-[#fa7143] font-bold">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onContratar();
                        }}
                        className="mt-6 w-full bg-gradient-to-r from-[#fa7143] to-[#ff9466] text-white font-semibold py-2 rounded-lg
                        hover:from-white hover:to-white hover:text-[#00332E] transition-all duration-300 shadow-md"
                    >
                        Contratar agora
                    </button>
                </div>

                {/* Dica ao usuário */}
                {!aberto && (
                    <p className="text-center text-sm text-gray-300 mt-4 opacity-90">
                        Toque para ver detalhes
                    </p>
                )}
            </div>
        </div>
    );
};

export default function ParaVoce() {
    const [openModal, setOpenModal] = useState(false);
    const [planoSelecionado, setPlanoSelecionado] = useState<string | null>(null);

    return (
        <>
            <header className="relative flex flex-col items-center justify-center text-center text-white py-28 bg-gradient-to-b from-[#006B66] to-[#00332E]">
                <img
                    src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80"
                    alt="Estrada com montanhas ao fundo"


                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
                <h1 className="relative text-4xl md:text-5xl font-bold drop-shadow-lg">
                    Escolha o plano ideal para a sua viagem!
                </h1>
                <p className="relative mt-4 text-lg max-w-2xl text-white/90">
                    Proteja-se em cada destino com segurança, conforto e assistência 24h.
                </p>
            </header>

            <section className="flex flex-col items-center py-20">
                <h2 className="text-[#00332E] text-3xl font-bold mb-12">
                    Nossas categorias de planos
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
                    <Plano
                        titulo="Anual"
                        destaque="Mais Vantajoso"
                        beneficios={[
                            "Ideal para quem viaja várias vezes ao ano",
                            "Cobertura completa em todas as viagens",
                            "Assistência médica internacional",
                            "Proteção de bagagem e imprevistos",
                            "Melhor custo-benefício",
                        ]}
                        bgImg="https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80"
                        onContratar={() => {
                            setPlanoSelecionado("Anual");
                            setOpenModal(true);
                        }}
                    />

                    <Plano
                        titulo="Mensal"
                        destaque="Mais Prático"
                        beneficios={[
                            "Perfeito para viagens de curta duração",
                            "Contratação simples e rápida",
                            "Cobertura válida por 30 dias",
                            "Proteção contra imprevistos de saúde",
                            "Ideal para turismo e negócios",
                        ]}
                        bgImg="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80"
                        onContratar={() => {
                            setPlanoSelecionado("Mensal");
                            setOpenModal(true);
                        }}
                    />

                    <Plano
                        titulo="Temporada"
                        destaque="Mais Flexível"
                        beneficios={[
                            "Ideal para viagens sazonais ou intercâmbios",
                            "Cobertura personalizada por período",
                            "Assistência médica e bagagem inclusa",
                            "Perfeito para férias prolongadas",
                            "Controle total sobre seu investimento",
                        ]}
                        bgImg="https://images.unsplash.com/photo-1502920514313-52581002a659?auto=format&fit=crop&w=1200&q=80"
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
            </section>

            <section className="py-20 text-center text-[#00332E]">
                <h3 className="text-3xl font-bold mb-8 text-[#00332E]">
                    Quem viaja com a gente recomenda!    
                </h3>

                <div className="flex flex-wrap justify-center gap-10 px-4">
                    {[
                        {
                            frase:
                                "“Fiquei doente em Paris e fui atendida em 20 minutos! Atendimento impecável.”",
                            nome: "— Mariana, SP",
                        },
                        {
                            frase:
                                "“Usei o seguro durante meu intercâmbio e fiquei surpresa com a agilidade!”",
                            nome: "— Lucas, MG",
                        },
                        {
                            frase:
                                "“Passei por um imprevisto fora do país e me senti realmente amparado.”",
                            nome: "— Fábio, RJ",
                        },
                    ].map((d, i) => (
                        <div
                            key={i}
                            className="max-w-md bg-white/90 backdrop-blur-sm shadow-lg border border-[#fa7143]/20 p-8 rounded-xl
                hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <p className="italic text-gray-700 text-lg">{d.frase}</p>
                            <span className="block mt-4 font-semibold text-[#fa7143]">
                                {d.nome}
                            </span>
                        </div>
                    ))}
                </div>
            </section>


            <section className="text-center text-[#00332E] py-20">
                <h3 className="text-4xl font-bold mb-4 drop-shadow-lg">
                    Pronto para sua próxima aventura?
                </h3>
                <p className="mb-8 text-lg opacity-95">
                    Fale com nossos especialistas e viaje com tranquilidade e segurança.
                </p>

                <a
                    href="https://wa.me/5511950534906?text=Olá!%20Tenho%20interesse%20em%20fazer%20um%20seguro%20viagem%20✈️"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-[#fa7143] to-[#ff9466] text-white font-semibold
                          px-8 py-3 rounded-lg shadow-md hover:from-[#00332E] hover:to-[#004c45]
                          hover:shadow-lg transition-all duration-300"
                >
                    Falar com um consultor
                </a>
            </section>

        </>
    );
}
