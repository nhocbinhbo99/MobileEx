class Car{
    brand: string;
    model: string;
    year: number;
    constructor(brand: string, model: string, year: number){
      this.brand =brand;
      this.model =model;
      this.year =year;
    }
    showInfo(): void{
      console.log(`${this.brand} ${this.model} - ${this.year}`);
    }
  }
  const car = new Car("Toyota", "Camry", 2025);
  car.showInfo();
  export {};