interface User{
  id: number;
  name: string;
}

function fetchUser(id: number): Promise<User>{
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: id, name: `User ${id}` });
    }, 1000);
  });
}

function fetchUsers(ids: number[]): Promise<User[]>{
  return Promise.all(ids.map((id: number): Promise<User> => fetchUser(id)));
}

async function main(): Promise<void>{
  const users: User[] = await fetchUsers([1, 2, 3]);
  console.log(users);
}

main().catch((error: Error): void => {
  console.log(error.message);
});


