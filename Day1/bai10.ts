class Account{
    public username: string;
    private password: string;
    readonly id: number;
    constructor(username: string, password: string, id: number){
      this.username = username;
      this.password = password;
      this.id = id;
    }
    showInfo(): void{
      console.log(`ID: ${this.id}, Username: ${this.username}`);
    }
  }
  const account = new Account("thanh123", "123456", 1);
  account.showInfo();
  export {};