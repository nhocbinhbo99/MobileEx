class Employee{
    name: string;
    constructor(name: string){
      this.name = name;
    }
  }
  class Manager extends Employee{
    manage(): void {
      console.log(`${this.name} dang quan ly team`);
    }
  }
  class Developer extends Employee{
    code(): void {
      console.log(`${this.name} dang code`);
    }
  }
  const manager = new Manager("An");
  const developer = new Developer("Thanh");
  manager.manage();
  developer.code();