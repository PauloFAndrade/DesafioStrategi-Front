import { useState } from "react";
import closeicon from "../../assets/closeIcon.svg";
import useUser from "../../hooks/useUser";
import Input from "../inputs";
import ToastErro from "../toastErro";
import "./style.scss";
import { toast } from "react-toastify";

function CardCadastroCliente({ setOpenModal, getClientes }) {
    const { setSuccess, setSuccessMessage, error, setError, errorMessage, setErrorMessage, token} = useUser();
    const [inputName, setInputName] = useState();
    const [inputCpf, setInputCpf] = useState();
    const [inputEmail, setInputEmail] = useState();
    const [inputTelefone, setInputTelefone] = useState();
    const [reativarModalVisible, setReativarModalVisible] = useState(false);
    const [id, setId] = useState();
 
    const onlyNumbers = (str) => str.replace(/[^0-9]/g, '');

    async function handleReativarCliente(){
        try {
            const response = await fetch(`http://localhost:3001/cliente-reativar/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const data = await response.json();
            
            if (!data.success) {
                setReativarModalVisible(false)
                toast.error(data.error);
                return
            }

            setReativarModalVisible(false)
            setOpenModal(false)
            toast.success(data.success)
            getClientes();
        } catch (error) {
            console.log(error.message);
        }
    }

    async function handleCadastro(e) {
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

        const newCliente = {
            nome: inputName,
            cpf: inputCpfCleaned,
            email: inputEmail,
            telefone: inputTelefoneCleaned
        }

        const teste = {
            cpf: newCliente.cpf,
            email: newCliente.email
        }

        try {

            const checkUser = await fetch('http://localhost:3001/cliente-check', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(teste)
            })

            const checkResult = await checkUser.json();

            console.log(checkResult)

            if(checkResult.exists === true){
                setReativarModalVisible(true);
                setId(checkResult.id);
                return;
            }

            const response = await fetch('http://localhost:3001/cliente-cadastro', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(newCliente)
            })

            const data = await response.json();
          
            if (!data.success) {
                toast.error(data.error)
                return;
            }

            toast.success(data.success)
            getClientes();
            setOpenModal(false);

        } catch (error) {
            console.log(error.message)
        }
    };

    return (
        <div onClick={() => setOpenModal(false)} className="cardCadastro-container z-50">
            <div onClick={e => e.stopPropagation()} className="cardCadastroCliente flex justify-center">
                
                {error && <ToastErro message={errorMessage} />}

                <span className="mt-10 text-4xl font-bold">Cadastro de Clientes</span>
                <span className="mb-10 text-xl">Para habilitar compras de imóveis!</span>

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
                        className={"w-full"}
                    />
                    
                    <div className="mt-5 flex w-full">
                        <button type="button"
                            onClick={() => setOpenModal(false)}
                            className="mr-5 justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-4 bg-gray-500 text-2xl font-bold text-white hover:opacity-80"
                        >
                            Voltar
                        </button>
                        <button
                            onClick={e => handleCadastro(e)}
                            className="justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-4 bg-[#ED5B2D] text-2xl font-bold text-white hover:opacity-80 "
                        >
                            Cadastrar
                        </button>
                    </div>
                    
                </form>

            </div>
            {reativarModalVisible && 
                <div className="z-[100] fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
                    <div className="bg-white p-9 pt-4 rounded-xl shadow-lg max-h-[38rem]">
                        
                        <div className="flex flex-col">
                            <span className="mt-5 text-4xl font-bold">Reativar Usuário</span>
                            <span className="mb-10 text-xl">Existe um Usuário Desativado Com Esses Dados, Gostaria de Reativá-lo?</span>
                        </div>

                        <div className="mt-5 flex w-full">
                            <button type="button"
                                onClick={(e) => {e.stopPropagation(); setReativarModalVisible(false)}}
                                className="mr-5 justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-4 bg-gray-500 text-2xl font-bold text-white hover:opacity-80"
                            >
                                Voltar
                            </button>
                            <button
                                onClick={(e) => {e.stopPropagation(); handleReativarCliente()}}
                                className="justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-4 bg-[#ED5B2D] text-2xl font-bold text-white hover:opacity-80 "
                            >
                                Reativar
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>


    )
}

export default CardCadastroCliente;
