class BankAccount{
    balance: number;
    constructor(balance: number){
      this.balance = balance;
    }
    deposit(amount: number): void{
      this.balance += amount;
    }
    withdraw(amount: number): void{
      if (amount <= this.balance){
        this.balance -= amount;
      } else {
        console.log("Not enough balance");
      }
    }
  }
  const account = new BankAccount(1000);
  account.deposit(500);
  console.log("After deposit:", account.balance);
  account.withdraw(300);
  console.log("After withdraw:", account.balance);