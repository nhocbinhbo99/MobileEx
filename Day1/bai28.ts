class Animal{
    protected makeSound(): void {
      console.log("Animal sound");
    }
    sound(): void {
      this.makeSound();
    }
  }
  class Dog extends Animal {
    protected makeSound(): void {
      console.log("Gau");
    }
  }
  class Cat extends Animal {
    protected makeSound(): void {
      console.log("Meoo");
    }
  }
  const dog = new Dog();
  const cat = new Cat();
  dog.sound();
  cat.sound();
  export {};