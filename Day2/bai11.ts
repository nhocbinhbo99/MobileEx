function waitForHello(): Promise<string>{
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Hello Async");
    }, 2000);
  });
}

async function main(): Promise<void>{
  const message: string = await waitForHello();
  console.log(message);
}

main().catch((error: Error): void => {
  console.log(error.message);
});


