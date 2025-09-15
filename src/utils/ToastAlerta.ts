import { toast, type ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ToastAlerta(
    mensagem: string,
    tipo: "sucesso" | "erro" | "info"
) {
    const options: ToastOptions = {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
        progress: undefined,
    };

    switch (tipo) {
        case "sucesso":
            toast.success(mensagem, options);
            break;
        case "erro":
            toast.error(mensagem, options);
            break;
        case "info":
        default:
            toast.info(mensagem, options);
            break;
    }
}
