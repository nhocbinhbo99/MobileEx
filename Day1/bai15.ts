class Book{
    title: string;
  
    constructor(title: string) {
      this.title = title;
    }
  }
  class User{
    name: string;
  
    constructor(name: string) {
      this.name = name;
    }
  }
  class Library {
    books: Book[] = [];
    users: User[] = [];
  
    addBook(book: Book): void {
      this.books.push(book);
    }
    addUser(user: User): void {
      this.users.push(user);
    }
    showBooks(): void {
      this.books.forEach((book: Book): void => {
        console.log(book.title);
      });
    }
  }
  const library = new Library();
  
  library.addBook(new Book("De Men"));
  library.addBook(new Book("Phieu Luu"));
  library.addUser(new User("Thanh"));
  library.showBooks();
  export {};