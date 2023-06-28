export default async function handleLoginSubmit(event, navigate) {
  
  event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

  // Obtener los valores de los campos del formulario
  const username = event.target.username.value;
  const password = event.target.password.value;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "username": username,
    "password": password
  });

  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: raw,
    redirect: 'follow'
  };

  try {
    const req = await fetch("http://127.0.0.1:3030/api/login", requestOptions);
    const res = await req.json(); //llega el token
    console.log(res)
    if (res.token) {// si hay tocken
      localStorage.setItem("accessToken",  res.token.accessToken ) //manda token al localStorage
      localStorage.setItem("refreshToken", res.token.refreshToken) //manda token al localStorage
      navigate("/news") //redirige a la proxima pagina
    } else {
      alert(`error:\n*******${res.message}*******`) // si no hay token imprime error
      console.log(`error:\n*******${res.message}*******`)  
      navigate("/ingreso") //redirige a la proxima pagina
    }
  } catch (error) {
    console.log('*****error*****', error.message);
  }
}