import handleLoginSubmit from "../handlers/handleLoginSubmit"
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate()
  return (
    <div className="Login">
      <h1>Ingresar</h1>
      <form id="loginForm" onSubmit={(e)=>handleLoginSubmit(e, navigate)}>

        <label htmlFor="username">Nombre:</label>
        <input type="text" name="username" required />

        <label htmlFor="password">Contraseña:</label>
        <input type="password" name="password" required />

        <input type="submit" value="Ingresar" />
      </form>
    </div>
  );
}

export default Login;
