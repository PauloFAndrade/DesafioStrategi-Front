import { useEffect, useState, useRef } from "react";
import CardCadastroCliente from "../../components/cardCadastroCliente";
import CardClientes from "../../components/cardClientes";
import CardEditCliente from "../../components/cardEditCliente";
import Header from "../../components/header";
import useUser from "../../hooks/useUser";
import "./style.scss";
import { TbSquarePlus } from "react-icons/tb";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { toast } from "react-toastify";
import CardDeleteCliente from "../../components/cardDeleteCliente";

function Clientes() {

    const { success,
        successMessage,
        error,
        errorMessage,
        openEditModal,
        setOpenEditmodal,
        openDeleteModal,
        setOpenDeletemodal,
        token
    } = useUser();
    
    const [inputClientes, setInputClientes] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [clientes, setClientes] = useState([]);
    const [searchedClientes, setSearchedClientes] = useState([]);

    const [selectedFilter, setSelectedFilter] = useState("recentes");

    const inputRef = useRef(null);

    useEffect(() => {
        getClientes();
    }, []);

    useEffect(() => {
        setClientes(ordenarClientes(clientes, selectedFilter));
        setSearchedClientes(ordenarClientes(searchedClientes, selectedFilter));
    }, [selectedFilter]);

    async function getClientes() {

        try {
            const response = await fetch('http://localhost:3000/clientes', {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const data = await response.json();

            setClientes(ordenarClientes(data.success, selectedFilter));
        } catch (error) {
            console.log(error);
        }

    }

    const handleInputChange = (e)  => {
        e.preventDefault();
        
        const {value} = e.target;

        if(!value){
            setInputClientes(value);
            setSearchedClientes([]);
            return;
        }

        setInputClientes(value);

        const matchedClients = [];
        clientes.map((cliente, index) => {
            if(cliente.nome.normalize('NFD').replace(/\p{Diacritic}/gu, '').toUpperCase().includes(value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toUpperCase())){
                matchedClients.push(cliente);
            }
        })

        setSearchedClientes(matchedClients);
        
        console.log(matchedClients);
    }

    function ordenarClientes(clientes, filtro) {
        if (filtro === "recentes") {
            return clientes.slice().sort((a, b) => b.data_de_cadastro.localeCompare(a.data_de_cadastro));
        } else if (filtro === "antigos") {
            return clientes.slice().sort((a, b) => a.data_de_cadastro.localeCompare(b.data_de_cadastro));
        }
        return clientes;
    }

    useEffect(() => {
        if(inputRef) inputRef.current.focus();
    }, [])

    return (

        <div className="clientes-page">
            <Header actualPage={'clientes'}/>
            <h1 className="ml-36 mt-[0.7em]">Gerenciar Clientes</h1>
            <div className="clientes-header">
                {openModal && <CardCadastroCliente setOpenModal={setOpenModal} getClientes={getClientes} />}
                {openEditModal && <CardEditCliente setOpenEditmodal={setOpenEditmodal} getClientes={getClientes} />}
                {openDeleteModal && <CardDeleteCliente setOpenDeletemodal={setOpenDeletemodal} getClientes={getClientes} />}
                <div className="input-clientes mr-2 w-[30%] bg-white">
                    <HiMagnifyingGlass className="text-4xl ml-4"/>
                    <label htmlFor={"pesquisa-clientes"} />
                    <div className="w-full">
                        <input
                            onChange={handleInputChange}
                            value={inputClientes}
                            placeholder="Pesquisar"
                            id={"pesquisa-clientes"}
                            type="search"
                            ref={inputRef}
                            className="w-full focus:outline-0 rounded-xl"
                        />
                    </div>
                </div>
                <div className="flex">
                    <div className="select mr-2">
                        <select name="filtro" id="filtro" className="w-full" value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)}>
                            <option value="recentes">Ordenar Por: Mais Recentes </option>
                            <option value="antigos">Ordenar Por: Mais Antigos</option>
                        </select>
                    </div>
                    <button className="hover:shadow flex text-white font-bold py-4 px-10 border justify-center items-center text-2xl bg-[#ED5B2D] rounded-xl" onClick={() => setOpenModal(true)}>
                        <TbSquarePlus className="text-white w-9 h-9 mr-2" />
                        Cadastrar Cliente
                    </button>
                </div>
            </div>
            <div className="spans">
                <span className="md:w-[28em] lg:w-[30em] text-black font-bold">Cliente</span>
                <span className="md:w-[28em] lg:w-[29em] text-black font-bold">Contato</span>
                <span className="w-[30.5em] text-black font-bold">Data que iniciou no app</span>
                <span className="w-[4em] h-10"></span>
            </div>
            
            {searchedClientes && searchedClientes.map(cliente => {
                return (

                    <CardClientes
                        key={cliente.id}
                        id={cliente.id}
                        nome={cliente.nome}
                        email={cliente.email}
                        dataCadastro={cliente.data_de_cadastro}
                        cpf={cliente.cpf}
                        telefone={cliente.telefone}
                        urlDaFoto={cliente.url_da_foto}
                        getClientes={getClientes}
                    />
                )
            })}
            

            {inputClientes == '' && clientes && clientes.map(cliente => {
                return (

                    <CardClientes
                        key={cliente.id}
                        id={cliente.id}
                        nome={cliente.nome}
                        email={cliente.email}
                        dataCadastro={cliente.data_de_cadastro}
                        cpf={cliente.cpf}
                        telefone={cliente.telefone}
                        urlDaFoto={cliente.url_da_foto}
                        getClientes={getClientes}
                    />
                )
            })}

        </div>
    )
}

export default Clientes;