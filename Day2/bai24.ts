interface Post{
  userId: number;
  id?: number;
  title: string;
  body: string;
}

async function postData(): Promise<void>{
  try{
    const newPost: Post = {
      userId: 1,
      title: "Learn Async Await",
      body: "Practice Fetch API with TypeScript"
    };
    const response: Response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPost)
    });

    if(!response.ok){
      throw new Error(`Request failed: ${response.status}`);
    }

    const createdPost: Post = await response.json();
    console.log(createdPost);
  }catch(error){
    const message: string = error instanceof Error ? error.message : "Request failed";
    console.log(message);
  }
}

postData().catch((error: Error): void => {
  console.log(error.message);
});


