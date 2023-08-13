import './style.scss';
import MaskedInput from "../mask/maskedInput"

function Input({ inputState, setInputState, htmlFor, placeholder, type, text, className, mask, required}) {

    return (
        <div className={`input ${className ? className : ''}`}>
            <label htmlFor={htmlFor}>{text}</label>
            <MaskedInput type={type} required={required} id={htmlFor} value={inputState} name={placeholder} onChange={(e) => setInputState(e.target.value)} mask={mask}/>
        </div>
    )
}

export default Input;