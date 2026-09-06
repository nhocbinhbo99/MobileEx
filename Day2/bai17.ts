function simulateTask(name: string, time: number): Promise<string>{
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${name} completed`);
    }, time);
  });
}

async function readResults(): Promise<void>{
  const tasks: Promise<string>[] = [
    simulateTask("Task 1", 1000),
    simulateTask("Task 2", 500),
    simulateTask("Task 3", 1500)
  ];

  for await(const result of tasks){
    console.log(result);
  }
}

readResults().catch((error: Error): void => {
  console.log(error.message);
});


