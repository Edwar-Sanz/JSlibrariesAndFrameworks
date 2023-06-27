// async function handleRegistroSubmit(event) {
//   event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

//   // Obtener los valores de los campos del formulario
//   const username = event.target.username.value;
//   const password = event.target.password.value;

//   const headers = new Headers();
//   headers.append("Content-Type", "application/json");

//   const raw = JSON.stringify({
//     "username": username,
//     "password": password
//   });

//   const requestOptions = {
//     method: 'POST',
//     headers: headers,
//     body: raw,
//     redirect: 'follow'
//   };

//   try {
//     const req = await fetch("http://127.0.0.1:3030/api/register", requestOptions);
//     const response = await req.text();
//     console.log(response)
//   } catch (error) {
//     console.log('*****error*****', error);
//   }
// }


function Registro() {
  return (
    <div className="Registro">
      <h1>Registro</h1>
      <form >
        <label htmlFor="username">Nombre:</label>
        <input type="text" name="username" required />

        <label htmlFor="password">Contraseña:</label>
        <input type="password" name="password" required />

        <input type="submit" value="Registrarse" />
      </form>
    </div>
  );
}
export default Registro;