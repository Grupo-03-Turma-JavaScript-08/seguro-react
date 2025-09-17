export default interface UsuarioLogin {
    id: number;
    nome: string;
    email: string;
    senha: string;
    token: string;
    tipo: "ADMIN" | "CLIENTE";
}
