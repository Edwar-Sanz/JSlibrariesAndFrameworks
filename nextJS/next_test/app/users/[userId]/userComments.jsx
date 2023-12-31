async function getUserComments(userId) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}/comments`
  );
  return res.json();
}

export default async function UserComments({ params }) {
  const userComments = await getUserComments(params.userId);

  return (
    <div>
      {
        <div>
          <ul>
            {userComments.map((item) => (
              <li key={item.id}>{item.body}</li>
            ))}
          </ul>
        </div>
      }
    </div>
  );
}
