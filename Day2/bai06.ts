function simulateTask(time: number): Promise<string>{
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Task finished after ${time}ms`);
    }, time);
  });
}

const tasks: Promise<string>[] = [simulateTask(1000), simulateTask(1500), simulateTask(2000)];

Promise.all(tasks).then((results: string[]): void => {
  console.log(results);
});


