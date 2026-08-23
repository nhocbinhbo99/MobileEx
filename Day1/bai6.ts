class Book{
    title: string;
    author: string;
    year: number;
    constructor(title: string, author: string, year: number){
      this.title = title;
      this.author =author;
      this.year =year;
    }
    displayInfo(): void{
      console.log(`${this.title} - ${this.author} - ${this.year}`);
    }
  }
  const book = new Book("Su tro lai cua 369", "Paulo", 1988);
  book.displayInfo();