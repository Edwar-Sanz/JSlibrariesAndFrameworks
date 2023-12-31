import Link from 'next/link'
import { Suspense } from 'react';
import UserComments from './userComments';

async function getUser(userId) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  return res.json();
}

async function getUserComments(userId) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/comments`);
  return res.json();
}

export default async function User({params}) {
  
  const user = await getUser(params.userId);
  const userComments = await getUserComments(params.userId);

  return (
    <div>
      <ul>
        <li>
          <Link href="/users">Usuarios</Link>
        </li>
      </ul>
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