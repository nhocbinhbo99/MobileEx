function downloadFile(): Promise<string>{
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Download complete");
    }, 3000);
  });
}

downloadFile().then((message: string): void => {
  console.log(message);
});


