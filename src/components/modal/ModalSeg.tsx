import React, { useMemo, useState, useEffect, useContext } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { ptBR } from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt, FaShieldAlt, FaPlaneDeparture, FaPlaneArrival, FaUser} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastAlerta } from "../../utils/ToastAlerta.ts";
import { criarSeguro } from "../../services/seguroService.ts";
import ModalContrato from "./ModalContrato.tsx";
import { AuthContext } from "../../contexts/AuthContext.tsx";

registerLocale("pt-BR", ptBR);

type Props = {
    isOpen: boolean;
    onClose: () => void;
    plano: string; // Anual / Mensal etc.
};

type SeguroForm = {
    descricao: string;
    origem: string;
    destino: string;
    tipo: "Nacional" | "Internacional";
    preco: number;
    dataInicio: Date | null;
    dataFim: Date | null;
};

const brl = (n: number) =>
    new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(isNaN(n) ? 0 : n);

function calcularDias(inicio: Date | null, fim: Date | null) {
    if (!inicio || !fim) return 1;
    const diff = Math.ceil(
        (fim.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24)
    );
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

export default function ModalSeguro({ isOpen, onClose, plano }: Props) {
    const navigate = useNavigate();
    const { usuario } = useContext(AuthContext);

    const [form, setForm] = useState<SeguroForm>({
        descricao: plano,
        origem: "Brasil",
        destino: "",
        tipo: "Nacional",
        preco: 0,
        dataInicio: null,
        dataFim: null,
    });

    const [contratoOpen, setContratoOpen] = useState(false);
    const [contratoAceito, setContratoAceito] = useState(true);

    // atualiza preço unitário
    useEffect(() => {
        let precoBase = 0;
        if (form.tipo === "Nacional") precoBase = 30;
        if (form.tipo === "Internacional") precoBase = 60;
        setForm((prev) => ({ ...prev, preco: precoBase }));
    }, [form.tipo]);

    const dias = useMemo(
        () => calcularDias(form.dataInicio, form.dataFim),
        [form.dataInicio, form.dataFim]
    );
    const base = useMemo(
        () => Math.round(form.preco * dias * 100) / 100,
        [form.preco, dias]
    );
    const aplica20 = useMemo(() => temAcrecimo20(form.destino), [form.destino]);
    const acrescimo = aplica20 ? Math.round(base * 0.2 * 100) / 100 : 0;
    const total = base + acrescimo;

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value as any }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!contratoAceito) {
            ToastAlerta("É necessário aceitar os termos do contrato.", "info");
            return;
        }
        if (!form.destino || !form.dataInicio || !form.dataFim) {
            ToastAlerta("Preencha destino e as datas da viagem.", "erro");
            return;
        }

        try {
            const payload = {
                nome: form.tipo, // ← agora o nome é o tipo do seguro
                descricao: form.descricao,
                origem: form.origem,
                destino: form.destino,
                preco: total,
                duracaoDias: dias,
            };

            await criarSeguro(payload, usuario.token);
            ToastAlerta("Plano assinado com sucesso!", "sucesso");

            onClose();
            navigate("/perfil");
        } catch (error) {
            console.log(error);
            ToastAlerta("Erro ao assinar plano!", "erro");
        }
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="flex w-full max-w-5xl bg-[#e0e5ec] rounded-2xl overflow-hidden">
                {/* Coluna esquerda */}
                <div className="hidden md:block w-1/2 relative">
                    <img
                        src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80"
                        alt="Paisagem de viagem"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <h2 className="text-2xl font-bold text-center">
                            <span className="text-[#fa7143]">Rota Segura,</span>{" "}
                            <span className="text-white">a resposta certa para sua viagem!</span>
                        </h2>
                    </div>
                </div>

                {/* Coluna direita */}
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                    <h2 className="text-2xl font-semibold text-center text-[#072B28] mb-6">
                        Contratação de Seguro ({plano})
                    </h2>
                    {/* Nome do usuário logado (somente visualização) */}
                    <div className="flex items-center px-4 py-3 rounded-lg bg-[#e0e5ec]
                     shadow-[inset_4px_4px_8px_#bec3cf,inset_-4px_-4px_8px_#ffffff] mb-2">
                        <FaUser className="text-[#0F7C72] mr-3" />
                        <input
                            type="text"
                            value={usuario?.nome || "Usuário não identificado"}
                            readOnly
                            disabled
                            className="w-full bg-transparent focus:outline-none cursor-not-allowed text-[#072B28] font-medium"
                        />
                    </div>


                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {/* Tipo de seguro (nome real) */}
                        <div className="flex items-center px-4 py-3 rounded-lg bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#bec3cf,inset_-4px_-4px_8px_#ffffff]">
                            <FaShieldAlt className="text-[#0F7C72] mr-3" />
                            <select
                                name="tipo"
                                value={form.tipo}
                                onChange={handleChange}
                                className="w-full bg-transparent focus:outline-none"
                            >
                                <option value="Nacional">Seguro Nacional</option>
                                <option value="Internacional">Seguro Internacional</option>
                            </select>
                        </div>

                        {/* Origem */}
                        <div className="flex items-center px-4 py-3 rounded-lg bg-[#e0e5ec]
                        shadow-[inset_4px_4px_8px_#bec3cf,inset_-4px_-4px_8px_#ffffff]">
                            <FaPlaneDeparture className="text-[#0F7C72] mr-3" />
                            <input
                                type="text"
                                name="origem"
                                value={form.origem}
                                onChange={handleChange}
                                placeholder="Origem da viagem"
                                className="w-full bg-transparent focus:outline-none placeholder-gray-500"
                                required
                            />
                        </div>

                        <div className="flex items-center px-4 py-3 rounded-lg bg-[#e0e5ec]
                        shadow-[inset_4px_4px_8px_#bec3cf,inset_-4px_-4px_8px_#ffffff]">
                            <FaPlaneArrival className="text-[#0F7C72] mr-3" />
                            <input
                                type="text"
                                name="destino"
                                value={form.destino}
                                onChange={handleChange}
                                placeholder="Destino da viagem"
                                className="w-full bg-transparent focus:outline-none placeholder-gray-500"
                                required
                            />
                        </div>
                        {aplica20 && (
                            <p className="text-xs text-[#fa7143]">
                                * Acréscimo de 20% aplicado (EUA/Canadá)
                            </p>
                        )}

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
                                    minDate={form.dataInicio as Date}
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

                        {/* Contrato */}
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
                                    contratoAceito
                                        ? "bg-[#072B28] hover:bg-[#0F7C72]"
                                        : "bg-gray-400 cursor-not-allowed"
                                }`}
                            >
                                Assinar plano
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Mini-modal contrato */}
            <ModalContrato
                isOpen={contratoOpen}
                onClose={() => setContratoOpen(false)}
                onAgree={() => setContratoAceito(true)}
            />
        </div>
    );
}

