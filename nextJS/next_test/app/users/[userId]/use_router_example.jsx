"use client"
import { useRouter } from "next/navigation";

export default function ToUsers(params) {

  const router = useRouter();

  return (
    <ul>
      <li>
        <button onClick={
          ()=>{
            alert("Aceptar para redireccionar")
            router.push("/")
          }
        }>
          Ejecutar acción antes de redireccionar</button>
      </li>
    </ul>
  );
}
