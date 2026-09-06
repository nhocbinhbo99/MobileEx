function simulateTask(name: string, time: number): Promise<string>{
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${name} finished`);
    }, time);
  });
}

const firstTask: Promise<string> = Promise.race([
  simulateTask("Task 1", 1500),
  simulateTask("Task 2", 500),
  simulateTask("Task 3", 1000)
]);

firstTask.then((result: string): void => {
  console.log(result);
});

