function getError(): Promise<never>{
  return Promise.reject(new Error("Something went wrong"));
}

async function handleError(): Promise<void>{
  try{
    await getError();
  }catch(error){
    const message: string = error instanceof Error ? error.message : "Unknown error";
    console.log(message);
  }
}

handleError().catch((error: Error): void => {
  console.log(error.message);
});


