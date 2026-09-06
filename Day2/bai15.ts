function runTask(name: string, time: number): Promise<string>{
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${name} completed`);
    }, time);
  });
}

async function runSequentially(): Promise<void>{
  const firstResult: string = await runTask("Task 1", 1000);
  console.log(firstResult);
  const secondResult: string = await runTask("Task 2", 1000);
  console.log(secondResult);
  const thirdResult: string = await runTask("Task 3", 1000);
  console.log(thirdResult);
}

runSequentially().catch((error: Error): void => {
  console.log(error.message);
});


