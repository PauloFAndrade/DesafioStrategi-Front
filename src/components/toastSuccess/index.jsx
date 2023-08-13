import "./style.scss";

function ToastSuccess({message}) {
    return (
        <div className="toast-success-container">
            <p>{message}</p>
        </div>
    );
}

export default ToastSuccess;
