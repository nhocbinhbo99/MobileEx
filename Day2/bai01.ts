const helloAsync: Promise<string> = new Promise((resolve) => {
  setTimeout(() => {
    resolve("Hello Async");
  }, 2000);
});

helloAsync.then((message: string): void => {
  console.log(message);
});

