interface Todo{
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

async function fetchCompletedTodos(): Promise<void>{
  try{
    const response: Response = await fetch("https://jsonplaceholder.typicode.com/todos");

    if(!response.ok){
      throw new Error(`Request failed: ${response.status}`);
    }

    const todos: Todo[] = await response.json();
    const completedTodos: Todo[] = todos.filter((todo: Todo): boolean => todo.completed === true);
    console.log(`Completed todos: ${completedTodos.length}`);
    console.log(completedTodos);
  }catch(error){
    const message: string = error instanceof Error ? error.message : "Request failed";
    console.log(message);
  }
}

fetchCompletedTodos().catch((error: Error): void => {
  console.log(error.message);
});


