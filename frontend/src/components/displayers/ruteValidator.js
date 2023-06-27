import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

function RuteValidator({ redirectPath = "/" }) {
  const [loading, setLoading] = useState(true); // para mostrar loading al ingrezar a validar
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function checkAuthorization() {
      const token = localStorage.getItem("token");

      let header = new Headers();
      header.append("Authorization", `Bearer ${token}`);

      let requestOptions = {
        method: "GET",
        headers: header,
        redirect: "follow",
      };

      try {
        const req = await fetch("http://127.0.0.1:3030/authorizer",requestOptions);
        const res = await req.json();
        console.log(`Acceso permitido??? ${res.isLogged}`);
        setLoggedIn(res.isLogged); // true o false dependiendo de la respuesta del server
      } catch (error) {
        console.log(`error: \n ********${error.message}********`);
        setLoggedIn(false); // si hay error false
      } finally {
        setLoading(false); //quita el loading
      }
    }
    checkAuthorization();
  }, []);

  if (loading) { return <div>Loading...</div>; } //renderiza el loading

  if (loggedIn) { // si es true continua con el render de la ruta
    return <Outlet />;
  } else {
    return <Navigate to={redirectPath} replace />; // si no es true redirecciona al inicio
  }
}

export default RuteValidator;
