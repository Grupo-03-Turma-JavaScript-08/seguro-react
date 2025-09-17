import type { Seguro } from "./Seguro";

export interface Categoria {
    id?: number;
    nome: string;
    descricao: string;
    seguro?: Seguro[];
}
