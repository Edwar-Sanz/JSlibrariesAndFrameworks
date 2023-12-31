import { Suspense } from 'react';
import UserComments from './userComments';
import ToUsers from './use_router_example';


async function getUser(userId) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  return res.json();
}


export default async function User({params}) {
  
  const user = await getUser(params.userId);

  return (
    <div>
      <ToUsers/>
      {
        <div>
          <h1>NOMBRE: {user.name}</h1>
          <p>EMAIL: {user.email}</p>

          <hr />
          
          <h2>Comentarios</h2>
          <Suspense fallback={<div>Cargando...</div>}>
            <UserComments params={{params}}/>
          </Suspense>

        </div>
      }
    </div>
  );
}