import { useEffect, useState } from "react";
import closeicon from "../../assets/closeIcon.svg";
import useUser from "../../hooks/useUser";
import Input from "../inputs";
import ToastErro from "../toastErro";
import { toast } from "react-toastify";
import "./style.scss";

function CardDeleteCliente({ setOpenDeletemodal, getClientes }) {
    const { setSuccess,
        setSuccessMessage,
        error,
        setError,
        errorMessage,
        setErrorMessage,
        cliente,
        token
    } = useUser();

    async function excluirCliente() {

        try {
            const response = await fetch(`http://localhost:3001/clientes/${cliente.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const data = await response.json();
            
            if (!data.success) {
                setOpenDeletemodal(false)
                toast.error(data.error);
                return
            }

            setOpenDeletemodal(false)
            toast.success(data.success)
            getClientes();

        } catch (error) {
            console.log(error.message);
        }

    }

    return (
        <div onClick={() => setOpenDeletemodal(false)} className="cardDelete-container z-50">
            <div onClick={e => e.stopPropagation()} className="cardDeleteCliente flex justify-center">
                {error && <ToastErro message={errorMessage} />}
                <span className="text-4xl font-bold">Desativar Usuário</span>
                <span className="mb-10 text-xl">Essa ação não pode ser desfeita!</span>
                <div className="mt-5 flex w-full">
                    <button type="button"
                        onClick={() => setOpenDeletemodal(false)}
                        className="mr-5 justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-4 bg-gray-500 text-2xl font-bold text-white hover:opacity-80"
                    >
                        Voltar
                    </button>
                    <button
                        onClick={excluirCliente}
                        className="justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-4 bg-[#ED5B2D] text-2xl font-bold text-white hover:opacity-80 "
                    >
                        Desativar
                    </button>
                </div>
            </div>
        </div>


    )
}

export default CardDeleteCliente;
