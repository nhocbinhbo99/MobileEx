function runTask(name: string, time: number): Promise<string>{
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${name} completed`);
    }, time);
  });
}

async function runInParallel(): Promise<void>{
  const results: string[] = await Promise.all([
    runTask("Task 1", 1500),
    runTask("Task 2", 1000),
    runTask("Task 3", 500)
  ]);
  console.log(results);
}

runInParallel().catch((error: Error): void => {
  console.log(error.message);
});


