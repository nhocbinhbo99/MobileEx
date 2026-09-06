function delay(time: number): Promise<void>{
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

async function multiplyByThree(number: number): Promise<number>{
  await delay(1000);
  return number * 3;
}

async function main(): Promise<void>{
  const result: number = await multiplyByThree(5);
  console.log(result);
}

main().catch((error: Error): void => {
  console.log(error.message);
});

