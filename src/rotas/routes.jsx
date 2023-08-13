import { Route, Routes } from "react-router-dom";
import RequireAuth from "../components/requireAuthComponent";
import UserProvider from "../contexts/UserProvider";
import Clientes from "../pages/clientes";
import Imoveis from "../pages/imoveis";
import Login from "../pages/login";
import Resumo from "../pages/resumo";
import Simulacao from "../pages/simulacaoDePagamento";


function Rotas() {
    return (
        <UserProvider>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path="/" element={<RequireAuth />}>
                    <Route path='imoveis' element={<Imoveis />} />
                    <Route path='simulacao' element={<Simulacao />} />
                    <Route path="clientes" element={<Clientes />} />
                    <Route path='resumo' element={<Resumo />} />
                </Route>
            </Routes>
        </UserProvider>
    );
};

export default Rotas;