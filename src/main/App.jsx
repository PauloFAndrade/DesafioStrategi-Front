import { BrowserRouter } from "react-router-dom";
import Rotas from '../rotas/routes';
import './App.scss';
import '../input.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer className="text-3xl" position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
        <Rotas/>
      </BrowserRouter>
   </div>
  );
}

export default App;
