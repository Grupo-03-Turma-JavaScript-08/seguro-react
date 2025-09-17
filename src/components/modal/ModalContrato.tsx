import { useState } from "react";

export default function ModalContrato({
                                          isOpen,
                                          onClose,
                                          onAgree,
                                      }: {
    isOpen: boolean;
    onClose: () => void;
    onAgree: () => void;
}) {
    const [aceito, setAceito] = useState(true);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 flex flex-col">
                <h2 className="text-lg font-bold mb-4 text-center">Contrato de Seguro Viagem</h2>

                {/* Texto rolável */}
                <div className="overflow-y-auto max-h-64 border rounded-lg p-4 text-sm text-gray-700 mb-4">
                    <p>
                        Este contrato regula a prestação de serviços de Seguro Viagem oferecido pela Rota
                        Segura Seguros LTDA...
                    </p>
                    <p className="mt-2">
                        1. Coberturas: assistência médica, extravio de bagagem, acidentes pessoais...
                    </p>
                    <p className="mt-2">2. Vigência: do dia X até o dia Y, conforme informado no plano.</p>
                    <p className="mt-2">
                        3. Valor e Pagamento: conforme calculado na tela de contratação.
                    </p>
                    <p className="mt-2">4. Foro: fica eleito o foro de São Paulo/SP.</p>
                    <p className="mt-4 font-semibold">
                        Ao prosseguir, declaro que li e concordo com os termos acima.
                    </p>
                </div>

                {/* Checkbox de aceite */}
                <label className="flex items-center mb-4 text-sm">
                    <input
                        type="checkbox"
                        checked={aceito}
                        onChange={(e) => setAceito(e.target.checked)}
                        className="mr-2"
                    />
                    Li e concordo com os termos do contrato
                </label>

                <div className="flex justify-end gap-3">
                    <button className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300" onClick={onClose}>
                        Fechar
                    </button>
                    <button
                        disabled={!aceito}
                        className={`px-4 py-2 rounded-lg text-white ${
                            aceito ? "bg-[#072B28] hover:bg-[#0F7C72]" : "bg-gray-400 cursor-not-allowed"
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