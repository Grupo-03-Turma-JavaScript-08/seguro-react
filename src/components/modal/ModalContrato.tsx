import React, { useState } from "react";

function ModalContrato({
                           isOpen,
                           onClose,
                           onAgree,
                       }: {
    isOpen: boolean;
    onClose: () => void;
    onAgree: () => void;
}) {
    const [aceito, setAceito] = useState(false);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[#e0e5ec] w-full max-w-lg rounded-2xl shadow-[8px_8px_16px_#bec3cf,-8px_-8px_16px_#ffffff] p-6 flex flex-col">
                <h2 className="text-xl font-bold mb-4 text-center text-[#072B28]">
                    Contrato de Seguro Viagem
                </h2>

                {/* Texto rolável */}
                <div className="overflow-y-auto max-h-64 rounded-lg p-4 text-sm text-gray-700 mb-4
                    bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#bec3cf,inset_-4px_-4px_8px_#ffffff]">
                    <p>
                        Este contrato regula a prestação de serviços de Seguro Viagem
                        oferecido pela Rota Segura Seguros LTDA:
                    </p>
                    <p className="mt-2">
                        1. Coberturas: Despesas médicas e hospitalares em casos de emergência.
                    </p>
                    <p className="mt-2">
                        2. Vigência: do dia X até o dia Y, conforme informado no plano.
                    </p>
                    <p className="mt-2">
                        3. Valor e Pagamento: conforme calculado na tela de contratação.
                    </p>
                    <p className="mt-2">
                        4. Foro: fica eleito o foro de São Paulo/SP.
                    </p>
                    <p className="mt-4 font-semibold text-[#0F7C72]">
                        Ao prosseguir, declaro que li e concordo com os termos acima.
                    </p>
                </div>

                {/* Checkbox de aceite */}
                <label className="flex items-center mb-4 text-sm text-[#072B28]">
                    <input
                        type="checkbox"
                        checked={aceito}
                        onChange={(e) => setAceito(e.target.checked)}
                        className="mr-2 accent-[#0F7C72]"
                    />
                    Li e concordo com os termos do contrato
                </label>

                <div className="flex justify-end gap-3">
                    <button
                        className="px-6 py-2 rounded-lg font-semibold text-[#072B28] bg-[#e0e5ec]
                        shadow-[4px_4px_8px_#bec3cf,-4px_-4px_8px_#ffffff] hover:opacity-80"
                        onClick={onClose}
                    >
                        Fechar
                    </button>
                    <button
                        disabled={!aceito}
                        className={`px-6 py-2 rounded-lg font-semibold text-white shadow-md transition ${
                            aceito
                                ? "bg-[#072B28] hover:bg-[#0F7C72]"
                                : "bg-gray-400 cursor-not-allowed"
                        }`}
                        onClick={() => {
                            onAgree();
                            onClose();
                        }}
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
}

