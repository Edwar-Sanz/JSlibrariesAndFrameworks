const handleLocalStorageToken = async () => {
  const token = localStorage.getItem('token');

  let header = new Headers();
  header.append("Authorization", `Bearer ${token}`);


  let requestOptions = {
    method: 'GET',
    headers: header,
    redirect: 'follow'
  };
   
  try {
    const req = await fetch("http://127.0.0.1:3030/authorizer", requestOptions)
    const res = await req.json(); 
    if (res.isLogged === true ) {  
      return true
    }
    return false
  } catch (error) {
    console.log(`error: \n ********${error.message}********` );
    return false
  }
};

export default handleLocalStorageToken;