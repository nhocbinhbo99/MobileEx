const randomPromise: Promise<number> = new Promise((resolve, reject) => {
  const number: number = Math.random();

  if(number >= 0.5){
    resolve(number);
  }else{
    reject(new Error("Random number is smaller than 0.5"));
  }
});
randomPromise
  .then((number: number): void =>{
    console.log(`Success: ${number}`);
  })
  .catch((error: Error): void => {
    console.log(`Error: ${error.message}`);
  });


