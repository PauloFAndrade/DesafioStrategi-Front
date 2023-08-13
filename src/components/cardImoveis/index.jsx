import './style.scss';
import useUser from "../../hooks/useUser";
import { useNavigate } from "react-router-dom"
import { FaLocationDot, FaHandHoldingDollar} from "react-icons/fa6";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { AiFillHome } from "react-icons/ai";

function CardImoveis({ tipo, endereco, valorDaVenda, foto, id, seeInMap}) {
    const { setImovel } = useUser();
    const navigate = useNavigate();

    const comissao = ((valorDaVenda.split(" ")[1].split(".").join("").split(",")[0]) * 0.05).toLocaleString('pt-br' ,{style: 'currency', currency:'BRL'});
    
    function handleImoveis() {
        
        setImovel({
            tipo,
            endereco,
            valorDaVenda,
            valorDaComissao: comissao,
            id,
            foto
        })
        
        navigate("/simulacao");
    }

    return (
        <div onClick={handleImoveis} className='card-imoveis w-[70em] h-[20em]'>
            <img className="w-[45%] h-[20em]" src={foto} alt="foto do imovel"/>
            <div className='ml-6 mr-3 text-xl mb-3 h-full flex flex-col justify-evenly w-[55%]'>
                <div className='flex items-center'>
                    <AiFillHome className='icon-imoveis text-[#ED5B2D]'/>
                    <h2 className='font-bold w-[95%]'>{tipo}</h2>
                </div>
                <div className='flex items-center'>
                    <FaLocationDot className='icon-imoveis text-[#ED5B2D]'/>
                    <h2 className='font-bold w-[95%]'>{endereco}</h2>
                </div>
                <div className='flex justify-between'>
                    <div className='flex items-center'>
                        <RiMoneyDollarCircleFill className='icon-imoveis text-[#ED5B2D]'/>
                        <h2 className='font-bold'>{valorDaVenda}</h2>
                    </div>
                    <div className='flex items-center'>
                        <FaHandHoldingDollar className='icon-imoveis text-[#ED5B2D]'/>
                        <h2 className='font-bold'>{comissao}</h2>
                    </div>
                </div>
                <div className='flex w-full items-center justify-between'>
                    <span className='ml-[3em] text-gray-600'>Disponibilidade Imediata</span>
                    <button onClick={(e) => {e.stopPropagation(); seeInMap(true, endereco)}} className='hover:scale-105 duration-300 px-[3em] py-[1em] bg-[#ED5B2D] rounded-md text-white font-bold text-xl'>
                        Ver no Mapa
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CardImoveis;