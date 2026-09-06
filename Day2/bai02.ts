function getNumber(): Promise<number>{
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(10);
    }, 1000);
  });
}

getNumber().then((number: number): void => {
  console.log(number);
});

