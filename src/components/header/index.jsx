import { NavLink, useNavigate, useLocation} from "react-router-dom";
import logo from "../../assets/logo.png";
import './style.scss';
import { useEffect, useState } from 'react'

function Header({actualPage}) {
    const navigate = useNavigate();
    const location = useLocation();

    const [pageButtonsEnabled, setPageButtonsEnabled] = useState({
        imoveis: false,
        simulacao: true,
        clientes: true,
        resumo: true,
    });

    function disableNextPages(pageName) {
        setPageButtonsEnabled(prevState => ({
            ...prevState,
            simulacao: pageName === 'imoveis',
            clientes: pageName === 'imoveis' || pageName === 'simulacao',
            resumo: pageName === 'imoveis' || pageName === 'simulacao' || pageName === 'clientes',
        }));
    }

    useEffect(() => {
        disableNextPages(actualPage);
    }, [])

    return (
        <div className='header'>
            <img onClick={() => navigate("/imoveis")} src={logo} alt="logo" />
            <nav>
                <ul className="text-2xl font-bold">
                    <li>
                        {pageButtonsEnabled.imoveis ? 
                            <span className="text-gray-500">Imoveis</span> 
                        :   <NavLink style={{textDecoration: 'none'}} to="/imoveis" onClick={() => disableNextPages('imoveis')}>
                                <h2 style={{color: location.pathname === "/imoveis" && '#ED5B2D'}} >Imoveis</h2>
                            </NavLink>
                        }
                    </li>
                    <li>
                        {pageButtonsEnabled.simulacao ? 
                            <span className="text-gray-500">Simulação</span> 
                        :   <NavLink style={{textDecoration: 'none'}} to="/simulacao" onClick={() => disableNextPages('simulacao')}>
                                <h2 style={{color: location.pathname === "/simulacao" && '#ED5B2D'}}>Simulação</h2>
                            </NavLink>
                        }
                    </li>
                    <li>
                        {pageButtonsEnabled.clientes ?
                            <span className="text-gray-500">Clientes</span>
                        :   <NavLink style={{textDecoration: 'none'}} to="/clientes" onClick={() => disableNextPages('clientes')}>
                                <h2 style={{color: location.pathname === "/clientes" && '#ED5B2D'}} >Clientes</h2>
                            </NavLink>
                        }
                    </li>
                    <li>
                        {pageButtonsEnabled.resumo ?
                            <span className="text-gray-500">Resumo da Venda</span>
                        :   <NavLink style={{textDecoration: 'none'}} to="/resumo" onClick={() => disableNextPages('resumo')}>
                                <h2 style={{color: location.pathname === "/resumo" && '#ED5B2D'}} >Resumo da Venda</h2>
                            </NavLink>
                        }
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Header;
