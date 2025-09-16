import { createContext, type ReactNode, useState } from "react";
import type UsuarioLogin from "../models/UsuarioLogin";
import { ToastAlerta } from "../utils/ToastAlerta";
import { login } from "../services/usuarioService.ts";

interface AuthContextProps {
    usuario: UsuarioLogin;
    isLoading: boolean;
    handleLogin: (usuario: UsuarioLogin) => Promise<void>;
    handleLogout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextProps>(
    {} as AuthContextProps
);

export function AuthProvider({ children }: AuthProviderProps) {
    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: "",
        email: "",
        tipo: "CLIENTE",
        senha: "",
        token: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin(usuarioLogin: UsuarioLogin): Promise<void> {
        setIsLoading(true);

        try {
            await login(usuarioLogin, setUsuario);
            ToastAlerta("Usuário foi autenticado com sucesso!", "sucesso");
        } catch {
            ToastAlerta("Os dados do Usuário estão inconsistentes!", "erro");
        } finally {
            setIsLoading(false);
        }
    }

    function handleLogout(): void {
        setUsuario({
            id: 0,
            nome: "",
            email: "",
            tipo: "CLIENTE",
            senha: "",
            token: "",
        });
        localStorage.removeItem("usuario");
    }

    return (
        <AuthContext.Provider
            value={{ usuario, isLoading, handleLogin, handleLogout }}
        >
            {children}
        </AuthContext.Provider>
    );
}
