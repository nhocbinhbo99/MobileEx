class Product{
    name: string;
    price: number;
    constructor(name: string, price: number){
      this.name = name;
      this.price = price;
    }
  }
  const products: Product[] = [
    new Product("Mouse", 50),
    new Product("Keyboard", 120),
    new Product("Monitor", 300),
    new Product("USB", 20),
  ];
  const expensiveProducts: Product[] = products.filter(
    (product: Product): boolean => product.price > 100,
  );
  console.log(expensiveProducts);