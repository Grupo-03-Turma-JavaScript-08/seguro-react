import type { Categoria } from "./Categoria";
import type { Usuario } from "./Usuario";

export interface Seguro {
    id?: number;
    nome: string;
    descricao: string;
    origem: string;
    destino: string;
    duracaoDias: number;
    preco: number;
    categoria?: Categoria;
    usuario?: Usuario | null;
}
