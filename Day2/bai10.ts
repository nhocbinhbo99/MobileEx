const resultPromise: Promise<string> = new Promise((resolve, reject) => {
  const isSuccess: boolean = Math.random() >= 0.5;

  if(isSuccess){
    resolve("Task succeeded");
  }else{
    reject(new Error("Task failed"));
  }
});

resultPromise
  .then((result: string): void => {
    console.log(result);
  })
  .catch((error: Error): void => {
    console.log(error.message);
  })
  .finally((): void => {
    console.log("Done");
  });


