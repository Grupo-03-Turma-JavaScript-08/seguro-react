import api from "../services/api";

// export const loginUsuario = async (
//   dados: { email: string; senha: string },
//   setToken: Function
// ) => {
//   try {
//     const resposta = await api.post("/auth/login", dados);
//     const token = resposta.data.token;
//
//     // salva no localStorage
//     localStorage.setItem("token", token);
//
//     // atualiza no estado
//     setToken(token);
//
//     return token;
//   } catch (error: any) {
//     throw error.response?.data || error;
//   }
// };

export const cadastrarUsuario = async (
    dados: { nome: string; email: string; senha: string },
    setDados: Function
) => {
    try {
        const resposta = await api.post("/usuario", dados);
        setDados(resposta.data);
    } catch (error: any) {
        throw error.response?.data || error;
    }
};

