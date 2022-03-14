
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ResponsiveAppBar from './components/navbar/Navbar'
import FromFornecedor from './components/fornecedor/Cadastrar';
import './App.css';
import Listar from "./components/fornecedor/Listar";
import Editar from "./components/fornecedor/Editar";

function App() {
  return (
    
    <BrowserRouter>
    <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<FromFornecedor />} />
        <Route path="Cadastrar" element={<FromFornecedor />} />
        <Route path="Listar" element={<Listar />} />
        <Route path="/Editar/:id" element={<Editar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
