interface Movable {
    move(): void;
  }
  class Car implements Movable {
    move(): void {
      console.log("Car moving");
    }
  }
  class Robot implements Movable {
    move(): void {
      console.log("Robot moving");
    }
  }
  const car = new Car();
  const robot = new Robot();
  car.move();
  robot.move();
  export {};