interface Vehicle{
    move(): void;
  }
  class Car implements Vehicle{
    move(): void {
      console.log("O to dang chay");
    }
  }
  class Bike implements Vehicle{
    move(): void {
      console.log("Xe dap dang chay");
    }
  }
  const car = new Car();
  const bike = new Bike();
  car.move();
  bike.move();
  