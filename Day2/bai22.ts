interface Todo{
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

async function fetchTodo(id: number): Promise<Todo>{
  const response: Response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);

  if(!response.ok){
    throw new Error(`Cannot load todo ${id}`);
  }

  return await response.json();
}

async function main(): Promise<void>{
  try{
    const todos: Todo[] = await Promise.all([fetchTodo(1), fetchTodo(2), fetchTodo(3)]);
    console.log(todos);
  }catch(error){
    const message: string = error instanceof Error ? error.message : "Request failed";
    console.log(message);
  }
}

main().catch((error: Error): void => {
  console.log(error.message);
});


