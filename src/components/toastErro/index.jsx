import "./style.scss";

function ToastErro({message}) {
    return (
        <div className="toast-error-container">
            <p>{message}</p>
        </div>
    );
}

export default ToastErro;
