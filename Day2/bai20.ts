function callApi(): Promise<string>{
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("API response");
    }, 3000);
  });
}
function createTimeout(): Promise<never>{
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("Request timed out"));
    }, 2000);
  });
}
async function requestWithTimeout(): Promise<void>{
  try{
    const result: string = await Promise.race([callApi(), createTimeout()]);
    console.log(result);
  }catch(error){
    const message: string = error instanceof Error ? error.message : "Request failed";
    console.log(message);
  }
}
requestWithTimeout().catch((error: Error): void => {
  console.log(error.message);
});


