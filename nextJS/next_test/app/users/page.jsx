import Link from 'next/link'

async function usersData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  return res.json();
}


export default async function IndexUsers() {
  
  const data = await usersData();

  return  (
    <div>

      <h1>IndexUsers</h1>
      {
        data.map(item => (
          <div key={item.id}>
            {item.name} 
            <button>
              <Link href={`/users/${item.id}`}>ver perfil</Link> 
            </button>
          </div>

          )          
        )
      }

    </div>
  );
}