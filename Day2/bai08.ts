Promise.resolve(2)
  .then((number: number): number => {
    return number * number;
  })
  .then((number: number): number => {
    return number * 2;
  })
  .then((number: number): number => {
    return number + 5;
  })
  .then((result: number): void => {
    console.log(result);
  });


