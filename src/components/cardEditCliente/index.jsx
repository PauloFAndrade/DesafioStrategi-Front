import { useEffect, useState } from "react";
import closeicon from "../../assets/closeIcon.svg";
import useUser from "../../hooks/useUser";
import Input from "../inputs";
import ToastErro from "../toastErro";
import "./style.scss";
import { toast } from "react-toastify";

function CardEditCliente({ setOpenEditmodal, getClientes }) {
    const { setSuccess,
        setSuccessMessage,
        error,
        setError,
        errorMessage,
        setErrorMessage,
        cliente,
        token
    } = useUser();
    const [inputName, setInputName] = useState();
    const [inputCpf, setInputCpf] = useState();
    const [inputEmail, setInputEmail] = useState();
    const [inputTelefone, setInputTelefone] = useState();


    useEffect(() => {
        setInputName(cliente.nome);
        setInputCpf(cliente.cpf);
        setInputEmail(cliente.email);
        setInputTelefone(cliente.telefone)
    }, [cliente])

    const onlyNumbers = (str) => str.replace(/[^0-9]/g, '');

    async function handleEdicao(e) {
        e.preventDefault()

        //Validando Nome
        if(!inputName || !/^[a-zA-ZÀ-ú\s]*$/.test(inputName) || inputName.replace(/\s/g, '') == ''){
            toast.error('Nome Inválido!');
            return;
        }

        //Validando CPF
        if(!inputCpf){
            toast.error('Digite Um CPF!');
            return;
        }

        let inputCpfCleaned = onlyNumbers(inputCpf)
        setInputCpf(inputCpfCleaned)
        if(!/^\d+$/.test(inputCpfCleaned) || inputCpfCleaned.replace(/\s/g, '') == '' || inputCpfCleaned.length != 11){
            toast.error('CPF Inválido!');
            return;
        }

        //Validando Telefone
        if(!inputTelefone){
            toast.error('Digite Um Telefone!');
            return;
        }
        let inputTelefoneCleaned = onlyNumbers(inputTelefone)
        setInputTelefone(inputTelefoneCleaned)
        console.log(inputTelefoneCleaned)
        if(!/^\d+$/.test(inputTelefoneCleaned) || inputTelefoneCleaned.replace(/\s/g, '') == '' || inputTelefoneCleaned.length != 11){
            toast.error('Telefone Inválido!');
            return;
        }

        const newClienteData = {
            id: cliente.id,
            nome: inputName,
            cpf: inputCpfCleaned,
            email: inputEmail,
            telefone: inputTelefoneCleaned
        }

        try {
            const response = await fetch('http://localhost:3001/cliente-edicao', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(newClienteData)

            })

            const data = await response.json();
            
            if (!data.success) {
                toast.error(data.error)
                return;
            }

            toast.success(data.success)
            getClientes();
            setOpenEditmodal(false);

        } catch (error) {
            console.log(error.message)
        }

    };

    return (
        <div onClick={() => setOpenEditmodal(false)} className="cardEdit-container z-50">
            <div onClick={e => e.stopPropagation()} className="cardEditCliente flex justify-center">
                {error && <ToastErro message={errorMessage} />}

                <span className="mt-10 text-4xl font-bold">Edição de Clientes</span>
                <span className="mb-10 text-xl">Mantenha Sempre Os Dados Atualizados!</span>

                <form>
                    <Input
                        placeholder="Nome do Cliente"
                        htmlFor="nome-cliente"
                        inputState={inputName}
                        setInputState={setInputName}
                        type="text"
                        text="Nome"
                        className={'w-full'}
                    />

                    <Input
                        placeholder="CPF do cliente"
                        htmlFor="cpf-cliente"
                        inputState={inputCpf}
                        setInputState={setInputCpf}
                        type="text"
                        text="CPF"
                        className={'w-full'}
                        mask={"999.999.999-99"}
                    />

                    <Input
                        placeholder="Telefone"
                        htmlFor="telefone-cliente"
                        inputState={inputTelefone}
                        setInputState={setInputTelefone}
                        type="text"
                        text="Telefone"
                        className={'w-full'}
                        mask={"(99) 99999-9999"}
                    />

                    <Input
                        placeholder="Email@clientes.com"
                        htmlFor="email-cliente"
                        inputState={inputEmail}
                        setInputState={setInputEmail}
                        type="email"
                        text="E-mail"
                        className={'w-full'}
                    />

                    <div className="mt-5 flex w-full">
                        <button type="button"
                            onClick={() => setOpenEditmodal(false)}
                            className="mr-5 justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-4 bg-gray-500 text-2xl font-bold text-white hover:opacity-80"
                        >
                            Voltar
                        </button>
                        <button
                            onClick={e => handleEdicao(e)}
                            className="justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-4 bg-[#ED5B2D] text-2xl font-bold text-white hover:opacity-80 "
                        >
                            Editar
                        </button>
                    </div>
                </form>

            </div>
        </div>


    )
}

export default CardEditCliente;
