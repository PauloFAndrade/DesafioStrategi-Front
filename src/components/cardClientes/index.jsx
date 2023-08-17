import { useState } from "react";
import { useNavigate } from "react-router-dom";
import foto from "../../assets/foto.svg";
import tresPontos from "../../assets/tres-pontos.svg";
import useUser from "../../hooks/useUser";
import ModalEditDelete from "../modalEditDelete";
import "./style.scss";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'


function CardClientes({ nome, email, dataCadastro, id , cpf, telefone, urlDaFoto, getClientes}) {
    const { setCliente} = useUser();
    const navigate = useNavigate();
    const [openModalEditDelete, setOpenModalEditDelete] = useState(false);

    const dataDeCadastro = dayjs(dataCadastro.substr(0,10)).format('DD/MM/YYYY')

    function handleClientes() {

        setCliente({
            nome,
            email,
            dataDeCadastro,
            id,
            cpf,
            telefone,
            urlDaFoto
        })

        navigate("/resumo");

    }

    function handleModalEditDelete() {

        if (!openModalEditDelete) {

            setCliente({
                nome,
                email,
                dataDeCadastro,
                id, 
                cpf,
                telefone
            })

            setOpenModalEditDelete(true)
            return;
        }

        setOpenModalEditDelete(false)
        setCliente();

    }


    return (
        <div onClick={handleClientes} className="card-clientes">
            <span><img className="clientPicture" src={ urlDaFoto ? urlDaFoto: foto} alt="imagem do cliente" />{nome}</span>
            <span>{email}</span>
            <span>{dataDeCadastro}</span>
            <div onClick={e => e.stopPropagation()}>
                <BiDotsHorizontalRounded onClick={handleModalEditDelete} className="w-[3em] mr-[1em] text-2xlxl"/>
                {openModalEditDelete && <ModalEditDelete setOpenModalEditDelete={setOpenModalEditDelete} getClientes={getClientes} />}
            </div>
        </div>
    )
}


export default CardClientes;
