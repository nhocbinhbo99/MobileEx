function getError(): Promise<never>{
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("Something went wrong"));
    }, 1000);
  });
}

getError().catch((error: Error): void => {
  console.log(error.message);
});

