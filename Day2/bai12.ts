function simulateTask(time: number): Promise<string>{
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Task done");
    }, time);
  });
}

async function runTask(): Promise<void>{
  const result: string = await simulateTask(2000);
  console.log(result);
}

runTask().catch((error: Error): void => {
  console.log(error.message);
});


