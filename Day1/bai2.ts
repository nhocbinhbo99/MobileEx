class Person{
    name: string;
    age: number;
    constructor(name: string, age: number){
      this.name =name;
      this.age =age;
    }
  }
  class Student extends Person{
    grade: number;
    constructor(name:string, age: number, grade: number) {
      super(name, age);
      this.grade = grade;
    }
    displayInfo(): void{
      console.log(`Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`);
    }
  }
  const student = new Student("Thanh",20,9);
  student.displayInfo();
  export {};