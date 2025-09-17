import { createContext, type ReactNode, useState } from "react";
import type UsuarioLogin from "../models/UsuarioLogin";
import { ToastAlerta } from "../utils/ToastAlerta";
import {
    buscarUsuarioPorToken,
    login,
    type UsuarioLoginResponse,
} from "../services/usuarioService";
import type { Usuario } from "../models/Usuario";

interface AuthContextProps {
    usuario: UsuarioLogin;
    isLoading: boolean;
    handleLogin: (dados: Pick<UsuarioLogin, "email" | "senha">) => Promise<void>;
    handleLogout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextProps>(
    {} as AuthContextProps
);

const usuarioPadrao: UsuarioLogin = {
    id: 0,
    nome: "",
    email: "",
    tipo: "CLIENTE",
    senha: "",
    token: "",
};

function obterUsuarioPersistido(): UsuarioLogin {
    if (typeof window === "undefined") {
        return usuarioPadrao;
    }
    try {
        const armazenado = localStorage.getItem("usuario");
        if (!armazenado) {
            return usuarioPadrao;
        }
        const usuarioParseado = JSON.parse(armazenado) as UsuarioLogin;
        return usuarioParseado.token ? usuarioParseado : usuarioPadrao;
    } catch {
        return usuarioPadrao;
    }
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [usuario, setUsuario] = useState<UsuarioLogin>(() => obterUsuarioPersistido());
    const [isLoading, setIsLoading] = useState(false);

    function persistirUsuario(dados: UsuarioLogin) {
        if (typeof window !== "undefined") {
            localStorage.setItem("usuario", JSON.stringify(dados));
        }
    }

    function definirUsuario(dados: UsuarioLogin) {
        setUsuario(dados);
        persistirUsuario(dados);
    }

    function montarUsuarioComDetalhes(
        autenticado: UsuarioLoginResponse,
        detalhes?: Usuario
    ): UsuarioLogin {
        return {
            id: autenticado.id ?? 0,
            nome: detalhes?.nome ?? autenticado.nome ?? "",
            email: detalhes?.email ?? autenticado.email ?? "",
            token: autenticado.token ?? "",
            tipo: detalhes?.tipo ?? autenticado.tipo ?? "CLIENTE",
            senha: "",
        };
    }

    async function handleLogin(credenciais: Pick<UsuarioLogin, "email" | "senha">): Promise<void> {
        setIsLoading(true);

        try {
            const usuarioAutenticado = await login(credenciais);

            let usuarioComDetalhes = montarUsuarioComDetalhes(usuarioAutenticado);

            if (usuarioAutenticado.token) {
                try {
                    const detalhes = await buscarUsuarioPorToken(usuarioAutenticado.token, usuarioAutenticado.id);
                    usuarioComDetalhes = montarUsuarioComDetalhes(usuarioAutenticado, detalhes);
                } catch (erro) {
                    console.error("Erro ao buscar detalhes do usuário:", erro);
                }
            }

            definirUsuario(usuarioComDetalhes);
            ToastAlerta("Usuário foi autenticado com sucesso!", "sucesso");
        } catch {
            ToastAlerta("Os dados do Usuário estão inconsistentes!", "erro");
        } finally {
            setIsLoading(false);
        }
    }

    function handleLogout(): void {
        setUsuario(usuarioPadrao);
        if (typeof window !== "undefined") {
            localStorage.removeItem("usuario");
        }
    }

    return (
        <AuthContext.Provider
            value={{ usuario, isLoading, handleLogin, handleLogout }}
        >
            {children}
        </AuthContext.Provider>
    );
}
