import './styles/App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import MainBar from './components/displayers/mainBar';
import Home from "./components/home"
import Login from "./components/Login"
import Registro from "./components/Registro"
import News from "./components/News"
import RuteValidator from './components/displayers/ruteValidator';

function AppPractice() {
  
  return (
    <BrowserRouter>
    <div className="AppPractice">
      
      <Routes>
        <Route path='/'         element={<MainBar children={<Home/>    } titulo={"Home"} notLogin={true}/>} />
        <Route path='/ingreso'  element={<MainBar children={<Login />  } />} />
        <Route path='/registro' element={<MainBar children={<Registro/>} />} />


        {/* --------------------rutas protegidas: -------------------- */}
        <Route element={ <RuteValidator />  }>
          <Route path='/news'element={<MainBar children={ <News /> } />} />
        </Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default AppPractice;
