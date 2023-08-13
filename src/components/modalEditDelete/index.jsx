import useUser from "../../hooks/useUser";
import "./style.scss";
import { toast } from "react-toastify";
import { useState } from 'react'

function ModalEditDelete({ setOpenModalEditDelete, getClientes }) {
    const { cliente,
        error,
        setError,
        errorMessage,
        setErrorMessage,
        success,
        setSuccess,
        successMessage,
        setSuccessMessage,
        setOpenEditmodal,
        setOpenDeletemodal,
        token,
    } = useUser();

    

    function handleEditDelete() {
        setOpenEditmodal(true);
        setOpenModalEditDelete(false);
    }

    function handleExcluirCliente() {
        setOpenDeletemodal(true);
        setOpenModalEditDelete(false);
    }

    return (
        <div>
            <div className="modal-edit-delete">
                <h2 onClick={handleExcluirCliente}>Excluir</h2>
                <h2 onClick={handleEditDelete}>Editar</h2>
            </div>
        </div>
    )
}

export default ModalEditDelete;