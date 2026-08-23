class Animal{
    name: string;
    constructor(name: string){
      this.name = name;
    }
  }
  class Dog extends Animal{
    bark(): void {
      console.log(`${this.name}: Gau`);
    }
  }
  class Cat extends Animal {
    meow(): void {
      console.log(`${this.name}: Meoo`);
    }
  }
  const dog = new Dog("Lulu");
  const cat = new Cat("Mimi");
  dog.bark();
  cat.meow();
  export {};