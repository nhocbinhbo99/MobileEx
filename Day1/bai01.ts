class Person{
    name: string;
    age: number;
    constructor(name: string, age: number){
      this.name=name;
      this.age=age;
    }
    displayInfo():void{
      console.log(`Name: ${this.name}, Age: ${this.age}`);
    }
  }
  const person = new Person("Thanh",20);
  person.displayInfo();
  export {};