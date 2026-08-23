class Rectangle{
    width: number;
    height: number;
    constructor(width: number, height: number){
      this.width =width;
      this.height = height;
    }
    area(): number{
      return this.width*this.height;
    }
    perimeter(): number{
      return 2 * (this.width + this.height);
    }
  }
  const rectangle = new Rectangle(5, 4);
  console.log("Area:", rectangle.area());
  console.log("Perimeter:", rectangle.perimeter());