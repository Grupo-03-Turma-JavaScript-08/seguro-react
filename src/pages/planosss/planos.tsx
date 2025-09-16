import { useEffect } from 'react';
import { FaHeartbeat, FaGlobeAmericas, FaCrown, FaUsers } from 'react-icons/fa';
import './plano.css';

const planos = [
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

const PlanCards = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
      {planos.map((plano, index) => (
        <div key={index} className="group perspective">
          <div className="card h-[400px]"> {/* Aumentada a altura do card */}
            {/* Frente */}
            <div className="card-front flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-lg text-center">
              {plano.icone}
              <h3 className="text-xl font-semibold text-[#4a6572]">{plano.nome}</h3>
            </div>

            {/* Verso */}
            <div className="card-back bg-[#FB7813] text-white rounded-xl shadow-xl p-6 flex flex-col justify-center">
              <div>
                <h4 className="text-lg font-bold mb-3">Cobertura:</h4>
                <ul className="list-disc pl-4 text-sm space-y-1 text-left">
                  {plano.cobertura.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlanCards;
