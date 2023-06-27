import { Navigate, Outlet} from "react-router-dom";
// import {useLocation } from "react-router-dom";
// import handleLocalStorageToken from "../../handlers/handleLocalStorageToken";

function RuteValidator({isLogged,redirectPath = '/'}) {
 
  if (isLogged===true) {
    return <Outlet />; 
  }
  return <Navigate to={redirectPath} replace />
}

export default RuteValidator;