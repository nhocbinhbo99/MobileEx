async function showSettledResults(): Promise<void>{
  const tasks: Promise<string>[] = [
    Promise.resolve("First request succeeded"),
    Promise.reject(new Error("Second request failed")),
    Promise.resolve("Third request succeeded")
  ];
  const results: PromiseSettledResult<string>[] = await Promise.allSettled(tasks);

  results.forEach((result: PromiseSettledResult<string>): void => {
    if(result.status === "fulfilled"){
      console.log(`fulfilled: ${result.value}`);
    }else{
      const reason: string = result.reason instanceof Error ? result.reason.message : String(result.reason);
      console.log(`rejected: ${reason}`);
    }
  });
}

showSettledResults().catch((error: Error): void => {
  console.log(error.message);
});


