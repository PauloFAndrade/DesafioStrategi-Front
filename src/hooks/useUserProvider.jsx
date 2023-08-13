import { useState } from "react";

function useUserProvider() {
    const [token, setToken] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [corretor, setcorretor] = useState({
        nome: "",
        id: ""
    });

    const [imovel, setImovel] = useState({
        tipo: "",
        endereco: "",
        valorDaVenda: "",
        valorDaComissao: "",
        urlDaFoto: ""
    });

    const [pagamento, setPagamento] = useState({
        formaDePagamento: "",
        valorDaParcela: ""
    });

    const [cliente, setCliente] = useState();
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState();

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    const[ openEditModal, setOpenEditmodal ] = useState(false);
    const[ openDeleteModal, setOpenDeletemodal] = useState(false);

    return {
        imovel,
        setImovel,
        pagamento,
        setPagamento,
        cliente,
        setCliente,
        token,
        setToken,
        corretor,
        setcorretor,
        isAuthenticated,
        setIsAuthenticated,
        success,
        setSuccess,
        successMessage,
        setSuccessMessage,
        error,
        setError,
        errorMessage,
        setErrorMessage,
        openEditModal,
        setOpenEditmodal,
        openDeleteModal,
        setOpenDeletemodal
    }
}



export default useUserProvider;
