async function fetchWithRetry(url: string, retries: number): Promise<Response>{
  let lastError: Error = new Error("Request failed");

  for(let attempt: number = 1; attempt <= retries; attempt++){
    try{
      const response: Response = await fetch(url);

      if(!response.ok){
        throw new Error(`Request failed: ${response.status}`);
      }

      return response;
    }catch(error){
      lastError = error instanceof Error ? error : new Error("Request failed");
      console.log(`Attempt ${attempt} failed`);
    }
  }

  throw lastError;
}

async function main(): Promise<void>{
  try{
    const response: Response = await fetchWithRetry("https://jsonplaceholder.typicode.com/todos/1", 3);
    const data: unknown = await response.json();
    console.log(data);
  }catch(error){
    const message: string = error instanceof Error ? error.message : "Request failed";
    console.log(message);
  }
}

main().catch((error: Error): void => {
  console.log(error.message);
});


