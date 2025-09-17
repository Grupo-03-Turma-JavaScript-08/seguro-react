import React, { useMemo, useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";
import { FaUser, FaGlobeAmericas, FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastAlerta } from "../../utils/ToastAlerta.ts";

registerLocale("pt-BR", ptBR);

type Props = {
    isOpen: boolean;
    onClose: () => void;
    plano: string;
};

type SeguroForm = {
    nome: string;
    descricao: string;
    origem: string;
    destino: string;
    tipo: "Nacional" | "Internacional";
    preco: number;
    dataInicio: Date | null;
    dataFim: Date | null;
};

const brl = (n: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
        isNaN(n) ? 0 : n
    );

function calcularDias(inicio: Date | null, fim: Date | null) {
    if (!inicio || !fim) return 1;
    const diff = Math.ceil((fim.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
}

function temAcrecimo20(destino: string) {
    const d = (destino || "").toLowerCase();
    return (
        d.includes("eua") ||
        d.includes("usa") ||
        d.includes("estados unidos") ||
        d.includes("united states") ||
        d.includes("canada")
    );
}

// Mini-modal de contrato
function ContratoModal({
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

export default function ModalSeguro({ isOpen, onClose, plano }: Props) {
    const navigate = useNavigate();

    const [form, setForm] = useState<SeguroForm>({
        nome: "",
        descricao: plano,
        origem: "Brasil",
        destino: "",
        tipo: "Nacional",
        preco: 0,
        dataInicio: null,
        dataFim: null,
    });

    const [contratoOpen, setContratoOpen] = useState(false);
    const [contratoAceito, setContratoAceito] = useState(false);

    // atualiza preço unitário pelo tipo
    useEffect(() => {
        let precoBase = 0;
        if (form.tipo === "Nacional") precoBase = 30;
        if (form.tipo === "Internacional") precoBase = 60;
        setForm((prev) => ({ ...prev, preco: precoBase }));
    }, [form.tipo]);

    const dias = useMemo(() => calcularDias(form.dataInicio, form.dataFim), [form.dataInicio, form.dataFim]);
    const base = useMemo(() => Math.round(form.preco * dias * 100) / 100, [form.preco, dias]);
    const aplica20 = useMemo(() => temAcrecimo20(form.destino), [form.destino]);
    const acrescimo = aplica20 ? Math.round(base * 0.2 * 100) / 100 : 0;
    const total = base + acrescimo;

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value as any }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        // validações rápidas
        if (!contratoAceito) {
            ToastAlerta("É necessário aceitar os termos do contrato.", "atencao");
            return;
        }
        if (!form.nome || !form.destino || !form.dataInicio || !form.dataFim) {
            ToastAlerta("Preencha nome, destino e as datas da viagem.", "erro");
            return;
        }

        try {
            const payload = {
                ...form,
                // enviar o valor final calculado
                preco: total,
                // converter datas para ISO
                dataInicio: form.dataInicio?.toISOString(),
                dataFim: form.dataFim?.toISOString(),
            };

            await criarSeguro(payload);
            ToastAlerta("Plano assinado com sucesso!", "sucesso");

            onClose();          // fecha o modal
            navigate("/home"); // vai para o perfil
        } catch (error) {
            ToastAlerta("Erro ao assinar plano!", "erro");
        }
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="flex w-full max-w-5xl bg-[#e0e5ec] rounded-2xl overflow-hidden">
                {/* Coluna esquerda - imagem */}
                <div className="hidden md:block w-1/2 relative">
                    <img
                        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
                        alt="Viagem"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <h2 className="text-2xl font-bold text-center">
                            <span className="text-[#072B28]">Rota Segura,</span>{" "}
                            <span className="text-white">a resposta certa para sua viagem!</span>
                        </h2>
                    </div>
                </div>

                {/* Coluna direita - formulário */}
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                    <h2 className="text-2xl font-semibold text-center text-[#072B28] mb-6">
                        Contratação de Seguro ({plano})
                    </h2>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {/* Nome */}
                        <div className="flex items-center px-4 py-3 rounded-lg bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#bec3cf,inset_-4px_-4px_8px_#ffffff]">
                            <FaUser className="text-[#0F7C72] mr-3" />
                            <input
                                type="text"
                                name="nome"
                                value={form.nome}
                                onChange={handleChange}
                                placeholder="Digite seu nome"
                                className="w-full bg-transparent focus:outline-none"
                                required
                            />
                        </div>

                        {/* Destino */}
                        <div className="flex items-center px-4 py-3 rounded-lg bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#bec3cf,inset_-4px_-4px_8px_#ffffff]">
                            <FaGlobeAmericas className="text-[#0F7C72] mr-3" />
                            <input
                                type="text"
                                name="destino"
                                value={form.destino}
                                onChange={handleChange}
                                placeholder="Destino da viagem"
                                className="w-full bg-transparent focus:outline-none"
                                required
                            />
                        </div>
                        {aplica20 && (
                            <p className="text-xs text-[#fa7143]">* Acréscimo de 20% aplicado (EUA/Canadá)</p>
                        )}

                        {/* Tipo */}
                        <div>
                            <label className="block text-sm font-medium mb-1 text-[#072B28]">Tipo de seguro</label>
                            <select
                                name="tipo"
                                value={form.tipo}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#bec3cf,inset_-4px_-4px_8px_#ffffff] focus:outline-none"
                            >
                                <option value="Nacional">Nacional</option>
                                <option value="Internacional">Internacional</option>
                            </select>
                        </div>

                        {/* Datas */}
                        <div className="flex gap-2">
                            <div className="flex items-center px-4 py-3 rounded-lg bg-[#e0e5ec] w-1/2 shadow-[inset_4px_4px_8px_#bec3cf,inset_-4px_-4px_8px_#ffffff]">
                                <FaCalendarAlt className="text-[#0F7C72] mr-3" />
                                <DatePicker
                                    selected={form.dataInicio}
                                    onChange={(date) => setForm({ ...form, dataInicio: date })}
                                    selectsStart
                                    startDate={form.dataInicio}
                                    endDate={form.dataFim}
                                    dateFormat="dd/MM/yyyy"
                                    locale="pt-BR"
                                    className="w-full bg-transparent focus:outline-none"
                                    placeholderText="Data início"
                                />
                            </div>

                            <div className="flex items-center px-4 py-3 rounded-lg bg-[#e0e5ec] w-1/2 shadow-[inset_4px_4px_8px_#bec3cf,inset_-4px_-4px_8px_#ffffff]">
                                <FaCalendarAlt className="text-[#0F7C72] mr-3" />
                                <DatePicker
                                    selected={form.dataFim}
                                    onChange={(date) => setForm({ ...form, dataFim: date })}
                                    selectsEnd
                                    startDate={form.dataInicio}
                                    endDate={form.dataFim}
                                    minDate={form.dataInicio}
                                    dateFormat="dd/MM/yyyy"
                                    locale="pt-BR"
                                    className="w-full bg-transparent focus:outline-none"
                                    placeholderText="Data retorno"
                                />
                            </div>
                        </div>
                        <p className="text-xs text-gray-500">Duração: {dias} dia(s)</p>

                        {/* Resumo */}
                        <div className="rounded-lg bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#bec3cf,inset_-4px_-4px_8px_#ffffff] p-4 text-sm">
                            <div className="flex justify-between">
                                <span>Preço unitário ({form.tipo})</span>
                                <span>{brl(form.preco)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Preço base</span>
                                <span>{brl(base)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Acréscimo (20%)</span>
                                <span>{brl(acrescimo)}</span>
                            </div>
                            <hr className="my-2 border-gray-300" />
                            <div className="flex justify-between font-bold text-[#fa7143]">
                                <span>Total</span>
                                <span>{brl(total)}</span>
                            </div>
                        </div>

                        {/* Link contrato */}
                        <div className="mt-3 text-xs text-gray-600 text-end">
                            <span>Ao assinar o plano você concorda com </span>
                            <button
                                type="button"
                                className="text-[#0F7C72] font-semibold hover:underline"
                                onClick={() => setContratoOpen(true)}
                            >
                                nossos termos
                            </button>
                        </div>

                        {/* Botões */}
                        <div className="flex justify-between mt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-2 rounded-lg font-semibold text-[#072B28] bg-[#e0e5ec] shadow-[4px_4px_8px_#bec3cf,-4px_-4px_8px_#ffffff] hover:opacity-80"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={!contratoAceito}
                                className={`px-6 py-2 rounded-lg font-semibold text-white ${
                                    contratoAceito ? "bg-[#072B28] hover:bg-[#0F7C72]" : "bg-gray-400 cursor-not-allowed"
                                }`}
                            >
                                Assinar plano
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Mini-modal contrato */}
            <ContratoModal
                isOpen={contratoOpen}
                onClose={() => setContratoOpen(false)}
                onAgree={() => setContratoAceito(true)}
            />
        </div>
    );
}
