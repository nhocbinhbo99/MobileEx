function wait(time: number): Promise<void>{
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

async function completeTask(): Promise<void>{
  await wait(5000);
  console.log("Task completed");
}

completeTask().catch((error: Error): void => {
  console.log(error.message);
});

