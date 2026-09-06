const numbers: number[] = [1,2,3,4,5,6,7,8];

const evenNumbers: Promise<number[]> = new Promise((resolve) =>{
  setTimeout(() => {
    resolve(numbers.filter((number: number): boolean => number%2 === 0));
  }, 1000);
});

evenNumbers.then((result: number[]): void => {
  console.log(result);
});


