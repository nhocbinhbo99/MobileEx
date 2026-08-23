interface Payment{
    pay(amount: number): void;
  }
  class CashPayment implements Payment{
    pay(amount: number): void {
      console.log(`Paid ${amount} by cash`);
    }
  }
  class CardPayment implements Payment{
    pay(amount: number): void {
      console.log(`Paid ${amount} by card`);
    }
  }
  const cash = new CashPayment();
  const card = new CardPayment();
  cash.pay(500);
  card.pay(1000);