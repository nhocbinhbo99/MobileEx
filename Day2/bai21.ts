interface Todo{
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
async function fetchTodo(): Promise<void>{
  try{
    const response: Response = await fetch("https://jsonplaceholder.typicode.com/todos/1");

    if(!response.ok){
      throw new Error(`Request failed: ${response.status}`);
    }
    const todo: Todo = await response.json();
    console.log(todo);
  }catch(error){
    const message: string = error instanceof Error ? error.message : "Request failed";
    console.log(message);
  }
}
fetchTodo().catch((error: Error): void => {
  console.log(error.message);
});


