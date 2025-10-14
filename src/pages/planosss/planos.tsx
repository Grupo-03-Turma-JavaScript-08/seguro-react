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

const segurosPadroes = [
    {
        nome: 'Seguro Nacional',
        icone: <FaMapMarkedAlt className="text-[#4a6572] text-5xl mb-4" />,
        cobertura: [
            'Cobertura em todo o Brasil',
            'Despesas médicas até R$ 50.000',
            'Atendimento 24h em português',
        ],
    },
    {
        nome: 'Seguro Internacional',
        icone: <FaPlaneDeparture className="text-[#4a6572] text-5xl mb-4" />,
        cobertura: [
            'Cobertura em mais de 150 países',
            'Despesas médicas até R$ 150.000',
            'Assistência com tradução',
        ],
    },
];

const segurosPersonalizados = [
    {
        nome: 'Plano Básico',
        icone: <FaHeartbeat className="text-[#4a6572] text-5xl mb-4" />,
        cobertura: [
            'Despesas médicas até R$ 30.000',
            'Suporte via WhatsApp',
            'Reembolso de bagagem',
        ],
    },
    {
        nome: 'Plano Intermediário',
        icone: <FaGlobeAmericas className="text-[#4a6572] text-5xl mb-4" />,
        cobertura: [
            'Despesas médicas até R$ 100.000',
            'Atendimento em 5 idiomas',
            'Cancelamento de voo',
        ],
    },
    {
        nome: 'Plano Premium',
        icone: <FaCrown className="text-[#4a6572] text-5xl mb-4" />,
        cobertura: [
            'Despesas médicas até R$ 500.000',
            'Traslado VIP aeroporto',
            'Consultas online grátis',
        ],
    },
    {
        nome: 'Plano Família',
        icone: <FaUsers className="text-[#4a6572] text-5xl mb-4" />,
        cobertura: [
            'Cobertura para até 5 membros',
            'Descontos progressivos',
            'Atendimento pediátrico',
        ],
    },
];

const CardList = ({
                      planos,
                      singleRow = false,
                  }: {
    planos: typeof segurosPadroes;
    singleRow?: boolean;
}) => (
    <div
        className={
            singleRow
                ? 'flex justify-center items-center gap-6 overflow-x-auto w-full pt-4 pb-8'
                : 'flex flex-wrap justify-center gap-6 w-full pt-4 pb-8'
        }
    >
        {planos.map((plano, index) => (
            <div
                key={index}
                className="group perspective w-[260px] flex-shrink-0 transition-transform hover:scale-105"
            >
                <div className="card h-[370px] bg-white rounded-2xl shadow-lg">
                    {/* Frente */}
                    <div className="card-front flex flex-col items-center justify-center p-5 bg-white rounded-2xl text-center">
                        {plano.icone}
                        <h3 className="text-lg font-semibold text-[#072B28] mt-1">{plano.nome}</h3>
                    </div>

                    {/* Verso */}
                    <div className="card-back bg-[#FB7813] text-white rounded-2xl shadow-xl p-5 flex flex-col justify-center">
                        <h4 className="text-lg font-bold mb-2">Cobertura:</h4>
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
            <div className="bg-[#e8edf2] w-full -mt-[100px] pb-10 flex flex-col items-center justify-center">
                <section className="text-center w-full max-w-7xl mt-24 mb-12">
                    <h2 className="text-2xl font-bold text-[#072B28] mb-6 border-b-4 border-[#FB7813] inline-block pb-1">
                        Seguros Padrões
                    </h2>
                    <CardList planos={segurosPadroes} />
                </section>

                <section className="text-center w-full max-w-7xl mt-6">
                    <h2 className="text-2xl font-bold text-[#072B28] mb-6 border-b-4 border-[#FB7813] inline-block pb-1">
                        Seguros Personalizados
                    </h2>
                    <CardList planos={segurosPersonalizados} singleRow />
                </section>
            </div>
        </>
    );
};

export default PlanCards;
