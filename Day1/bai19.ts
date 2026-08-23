class Animal{
    sound(): void {
      console.log("Animal sound");
    }
  }
  class Dog extends Animal{
    sound(): void {
      console.log("Gau");
    }
  }
  class Cat extends Animal{
    sound(): void {
      console.log("Meoo");
    }
  }
  const animals: Animal[] = [new Dog(), new Cat()];
  animals.forEach((animal: Animal): void => {
    animal.sound();
  });
  export {};