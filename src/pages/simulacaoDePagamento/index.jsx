import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from '../../components/header';
import useUser from "../../hooks/useUser";
import "./style.scss";
import { FaRegClock, FaArrowRightLong} from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";


function Simulacao() {

    const { imovel, setPagamento } = useUser();
    const navigate = useNavigate();
    const [aPrazoChecked, setAPrazoChecked] = useState(false);
    const [aVistaChecked, setAVistaChecked] = useState(true);
    const teste = true;

    const parcela = imovel.valorDaVenda && ((imovel.valorDaVenda.split(" ")[1].split(".").join("").split(",")[0]) / 180).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

    function handleAVistaChecked() {
        if (aVistaChecked) {
            return;
        };

        setAVistaChecked(true);
        setAPrazoChecked(false);
    };

    function handleAPrazoChecked() {
        if (aPrazoChecked) {
            return;
        };

        setAPrazoChecked(true);
        setAVistaChecked(false);

    };

    function handlePagamento() {
        if (aVistaChecked) {
            setPagamento({
                formaDePagamento: "à vista",
                valorDaParcela: imovel.valorDaVenda
            });
            navigate("/clientes")
            return;
        }

        if (aPrazoChecked) {
            setPagamento({
                formaDePagamento: "à prazo",
                valorDaParcela: parcela
            });
            navigate("/clientes")
            return;
        }
    }

    return (
        <div className="simulacao-page h-screen">
            <Header actualPage={'simulacao'}/>
            <div className="flex flex-col justify-between h-2/3 mt-[2em]">
                <div className="flex flex-col mb-[2em]">
                    <span className="ml-36 font-bold text-[3em]">Opções de Pagamento</span>
                    <span className="ml-36 font-bold text-xl">Escolha a melhor forma de pagamento para o seu cliente</span>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <div className="flex justify-center mb-10">
                        <div onClick={handleAVistaChecked} className={`${aVistaChecked ? 'bg-[#ED5B2D]' : 'bg-white'}  h-[32em] w-96 mr-[8em] rounded-3xl shadow-2xl hover:shadow-black hover:scale-105 duration-500 justify-evenly items-center flex flex-col `}>
                            <GiTakeMyMoney className={`text-6xl ${aVistaChecked ? 'text-white' : ''}`}/>
                            <div className="flex flex-col justify-center items-center">
                                <label htmlFor="prazo" className={`text-6xl ${aVistaChecked ? 'text-white' : ''} font-bold`}>À Vista</label>
                                <span className={`text-2xl font-bold ${aVistaChecked ? 'text-white' : ''}`}>Pagamento Na Hora</span>
                            </div>
                            <div className="flex justify-center items-end">
                                <span className={`text-4xl font-bold ${aVistaChecked ? 'text-white' : ''}`}>{imovel.valorDaVenda}</span>
                            </div>
                            <input value="avista" name="pagamento" id="avista" type="radio" checked={aVistaChecked} onChange={() => {}}  hidden/>
                        </div>
                        <div onClick={handleAPrazoChecked} className={`${aPrazoChecked ? 'bg-[#ED5B2D]' : 'bg-white'}  h-[32em] w-96 rounded-3xl justify-evenly items-center flex flex-col shadow-2xl hover:shadow-black hover:scale-105 duration-500`}>
                            <FaRegClock className={`text-6xl ${aPrazoChecked ? 'text-white' : ''}`}/>
                            <div className="flex flex-col justify-center items-center">
                                <label htmlFor="prazo" className={`text-8xl ${aPrazoChecked ? 'text-white' : ''} font-bold`}>180x</label>
                                <span className={`text-2xl font-bold ${aPrazoChecked ? 'text-white' : ''}`}>SEM JUROS</span>
                            </div>
                            <div className="flex justify-center items-end">
                                <span className={`text-2xl mr-3 ${aPrazoChecked ? 'text-white' : ''}`}>de</span>
                                <span className={`text-4xl ${aPrazoChecked ? 'text-white' : ''}`}>{parcela}</span>
                            </div>
                            <input value="prazo" name="pagamento" id="prazo" type="radio" checked={aPrazoChecked} onChange={() => {}} hidden/>
                        </div>
                    </div>
                    <button onClick={handlePagamento} className={`p-8 bg-[#ED5B2D] rounded-full hover:scale-105 duration-300 hover:shadow-md`}>
                        <FaArrowRightLong className="text-6xl text-white"/>
                    </button>
                </div>
            </div>
        </div>
    );

};

export default Simulacao;