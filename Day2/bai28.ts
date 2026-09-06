function createTask(number: number): Promise<string>{
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Task ${number} completed`);
    }, number * 200);
  });
}
async function batchProcess(): Promise<void>{
  const tasks: Promise<string>[] = [
    createTask(1),
    createTask(2),
    createTask(3),
    createTask(4),
    createTask(5)
  ];
  const results: string[] = await Promise.all(tasks);
  console.log(results);
}
batchProcess().catch((error: Error): void => {
  console.log(error.message);
});


