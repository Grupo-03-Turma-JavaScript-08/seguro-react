import type {Seguro} from "../models/Seguro.ts";

export const calcularPrecoFinal = (seguro: Seguro): number => {
    let valorTotal =
        Number(seguro.preco ?? 0) * Math.max(1, Number(seguro.duracaoDias ?? 1));

    const destino = (seguro.destino ?? "").toLowerCase();
    const aplicaAcrecimo = destino.includes("eua") || destino.includes("canada");

    if (aplicaAcrecimo) {
        valorTotal *= 1.2; // +20%
    }

    return Math.round(valorTotal * 100) / 100;
};
