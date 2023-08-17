import { useNavigate } from "react-router-dom";
import Header from '../../components/header';
import useUser from "../../hooks/useUser";
import "./style.scss";
import { FaLocationDot, FaHandHoldingDollar} from "react-icons/fa6";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { AiFillHome } from "react-icons/ai";
import { FaArrowRightLong} from "react-icons/fa6";
import { toast } from "react-toastify";
import foto from "../../assets/foto.svg"

function Resumo() {
    const navigate = useNavigate();
    
    const { imovel,
        pagamento,
        cliente,
        token
    } = useUser();

    const comissaoNumber = imovel.valorDaVenda && ((imovel.valorDaVenda.split(" ")[1].split(".").join("").split(",")[0]) * 0.05);

    async function cadastrarVendas() {
        const newVenda = {
            id_imovel: imovel.id,
            valor: imovel.valorDaVenda,
            condicaoDePagamento: pagamento.formaDePagamento,
            comissao: comissaoNumber,
            nomeCliente: cliente.nome,
            email: cliente.email,
        };

        try {
            const response = await fetch('http://localhost:3001/vendas-cadastro', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(newVenda)
            })

            const data = await response.json();

            if (!data.success) {
                toast.error(data.error)
                return;
            }
            toast.success(data.success)

            const desativarImovel = await fetch(`http://localhost:3001/imoveis/${newVenda.id_imovel}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            navigate('/imoveis')

        } catch (error) {
            console.log(error.message);
        }

    }

    return (
        <div className="resumo-page">
            <Header actualPage={'resumo'}/>
            <div className="flex flex-col mb-[2em] mt-[2em]">
                <span className="ml-36 font-bold text-[3em]">Resumo da Venda</span>
                <span className="ml-36 font-bold text-xl">Confira os detalhes com atenção.</span>
            </div>
            <div className="flex w-full justify-center items-center">
                <div className="w-[50%] bg-white h-[60rem] rounded-2xl drop-shadow-md flex flex-col justify-between">
                    <div className="flex flex-col justify-end py-[2em] px-[2em] w-full h-[20rem] bg-gradient-to-r from-[#FF4D00] to-[#FF4D0099] rounded-t-xl">
                        <div className="flex">
                            <div className="w-[12em] h-[12em] bg-white rounded-full">
                                <img className="w-[12em] h-[12em] drop-shadow-xl rounded-full" src={cliente.urlDaFoto ? cliente.urlDaFoto : foto} alt="foto do cliente    "></img>
                            </div>
                            <div className="ml-[2em] flex flex-col justify-center">
                                <span className="text-white text-3xl font-bold">{cliente && cliente.nome}</span>
                                <span className="text-white text-xl">{cliente && cliente.email}</span>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <span className="text-white font-bold text-xl">Vendedor: Thiago Ferreira</span>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="sm:w-[60%] ml-[2em] flex justify-around flex-col">
                            <div className='flex items-center text-xl xl:text-2xl mb-[1em]'>
                                <AiFillHome className='icon-imoveis text-[#ED5B2D]'/>
                                <h2 className='font-bold w-[90%]'>{imovel.tipo}</h2>
                            </div>
                            <div className='flex items-center text-xl xl:text-2xl mb-[1em]'>
                                <FaLocationDot className='icon-imoveis text-[#ED5B2D]'/>
                                <h2 className='font-bold w-[90%]'>{imovel.endereco}</h2>
                            </div>
                            <div className="flex text-xl xl:text-2xl mb-[1em]">
                                <div className='flex items-center mr-[2em]'>
                                    <RiMoneyDollarCircleFill className='icon-imoveis text-[#ED5B2D]'/>
                                    <h2 className='font-bold w-[90%]'>{imovel.valorDaVenda}</h2>
                                </div>
                                <div className='flex items-center'>
                                    <FaHandHoldingDollar className='icon-imoveis text-[#ED5B2D]'/>
                                    <h2 className='font-bold w-[90%]'>{imovel.valorDaComissao}</h2>
                                </div>
                            </div>
                            <span className="text-justify text-xl mr-[1em]">"Este é o ponto de partida para a próxima fase da sua vida, onde a 
                            liberdade de criação ganha forma em cada centímetro deste espaço que agora é seu".
                            </span>
                        </div>
                        <img className="sm:w-[40%] mr-[2em] h-[20em] rounded-2xl" src={imovel.foto} alt="foto do imovel"/>
                    </div>
                    <div className="mr-[2em] ml-[2em]">
                        <div className="flex justify-between mb-[1em]">
                            <span className="text-xl xl:text-2xl font-bold">Forma de Pagamento</span>
                            <span className="text-xl xl:text-2xl">{pagamento.formaDePagamento}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-xl xl:text-2xl font-bold">Total</span>
                            <span className="text-xl xl:text-2xl">{pagamento.formaDePagamento === "à vista" ? "1 parcela de " : "180 parcelas de "}{pagamento.valorDaParcela}</span>
                        </div>
                    </div>
                    <div className="px-[10em] mb-[3em]">
                        <button onClick={cadastrarVendas} className="hover:scale-105 duration-300 flex justify-center items-center bg-[#FF4D00] py-[0.5em] w-full rounded-2xl text-white font-bold text-2xl">
                            <span>Finalizar Venda</span> 
                            <FaArrowRightLong className="ml-[1em] text-2xl text-white"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Resumo;
