function processTask(name: string, time: number): Promise<string>{
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${name} completed`);
    }, time);
  });
}

async function queueProcess(): Promise<void>{
  const tasks: Array<() => Promise<string>> = [
    (): Promise<string> => processTask("Task 1", 1000),
    (): Promise<string> => processTask("Task 2", 500),
    (): Promise<string> => processTask("Task 3", 1500)
  ];

  for(const task of tasks){
    const result: string = await task();
    console.log(result);
  }
}

queueProcess().catch((error: Error): void => {
  console.log(error.message);
});


