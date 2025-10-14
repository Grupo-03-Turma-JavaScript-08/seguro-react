import { useEffect } from 'react';
import {
    FaHeartbeat,
    FaGlobeAmericas,
    FaCrown,
    FaUsers,
    FaMapMarkedAlt,
    FaPlaneDeparture,
} from 'react-icons/fa';
import './plano.css';

const planosGerais = [
    {
        nome: 'Seguro Nacional',
        icone: <FaMapMarkedAlt className="text-[#4a6572] text-5xl mb-3" />,
        cobertura: [
            'Cobertura em todo o Brasil',
            'Despesas médicas até R$ 50.000',
            'Atendimento 24h em português',
        ],
    },
    {
        nome: 'Seguro Internacional',
        icone: <FaPlaneDeparture className="text-[#4a6572] text-5xl mb-3" />,
        cobertura: [
            'Cobertura em mais de 150 países',
            'Despesas médicas até R$ 150.000',
            'Assistência com tradução',
        ],
    },
    {
        nome: 'Seguro Básico',
        icone: <FaHeartbeat className="text-[#4a6572] text-5xl mb-3" />,
        cobertura: [
            'Despesas médicas até R$ 30.000',
            'Suporte via WhatsApp',
            'Reembolso de bagagem',
        ],
    },
    {
        nome: 'Seguro Intermediário',
        icone: <FaGlobeAmericas className="text-[#4a6572] text-5xl mb-3" />,
        cobertura: [
            'Despesas médicas até R$ 100.000',
            'Atendimento em 5 idiomas',
            'Cancelamento de voo',
        ],
    },
    {
        nome: 'Seguro Premium',
        icone: <FaCrown className="text-[#4a6572] text-5xl mb-3" />,
        cobertura: [
            'Despesas médicas até R$ 500.000',
            'Traslado VIP aeroporto',
            'Consultas online grátis',
        ],
    },
    {
        nome: 'Seguro Família',
        icone: <FaUsers className="text-[#4a6572] text-5xl mb-3" />,
        cobertura: [
            'Cobertura para até 5 membros',
            'Descontos progressivos',
            'Atendimento pediátrico',
        ],
    },
];

const CardList = ({ planos }: { planos: typeof planosGerais }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full pt-4 pb-8 justify-items-center">
        {planos.map((plano, index) => (
            <div
                key={index}
                className="group w-[320px] h-[360px] transition-transform hover:scale-105"
            >
                <div className="card bg-white rounded-xl shadow-sm hover:shadow-md h-full transition-all duration-300">
                    {/* Frente */}
                    <div className="card-front flex flex-col items-center justify-center p-4 bg-white rounded-xl text-center h-full">
                        {plano.icone}
                        <h3 className="text-lg font-semibold text-[#072B28] mt-1">
                            {plano.nome}
                        </h3>
                    </div>

                    {/* Verso */}
                    <div className="card-back bg-[#FB7813] text-white rounded-xl shadow-md p-4 flex flex-col justify-center h-full">
                        <h4 className="text-base font-bold mb-2">Cobertura:</h4>
                        <ul className="list-disc pl-4 text-sm space-y-1 text-left">
                            {plano.cobertura.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

const PlanCards = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <>
            <div className="w-full min-h-screen -mt-[100px] pb-10 flex flex-col items-center justify-center">
                <section className="text-center w-full max-w-7xl mt-20 px-4">
                    <h2 className="text-3xl font-bold text-[#0D572D] my-6">
                        Nossos Seguros
                    </h2>

                    <CardList planos={planosGerais} />
                </section>
            </div>
        </>
    );
};

export default PlanCards;
