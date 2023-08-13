import { useState } from "react";
import Input from "../inputs/";
import logo from "../../assets/logo.png";
import './style.scss';

function CardLogin({ handleLogin }) {
    const [inputName, setInputName] = useState();
    const [inputPassword, setInputPassword] = useState();

    function handleSubmit(e) {
        e.preventDefault();
        handleLogin(inputName, inputPassword)
    }

    return (
        <div className="card-login min-w-[40em]">
            <img className="logo-login" src={logo} alt="logo" />
            <h1 className="text-3xl font-bold">Login</h1>

            <form >
                <Input
                    htmlFor="username"
                    text="Nome de Usuário"
                    placeholder="Nome de Usuário"
                    type="text"
                    inputState={inputName}
                    setInputState={setInputName}
                />
                <Input
                    htmlFor="password"
                    text="Senha"
                    placeholder="Senha"
                    type="password"
                    inputState={inputPassword}
                    setInputState={setInputPassword}
                />
                <button onClick={(e) => handleSubmit(e)}>Entrar</button>
            </form>
        </div>
    )
}

export default CardLogin;