interface Flyable{
    fly(): void;
  }
  interface Swimmable{
    swim(): void;
  }
  class Bird implements Flyable{
    fly(): void {
      console.log("Chim dang bay");
    }
  }
  class Fish implements Swimmable {
    swim(): void {
      console.log("Ca dang boi");
    }
  }
  const bird = new Bird();
  const fish = new Fish();
  bird.fly();
  fish.swim();