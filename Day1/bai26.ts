class Product{
    name: string;
    price: number;
    constructor(name: string, price: number) {
      this.name = name;
      this.price = price;
    }
  }
  class Order {
    products: Product[];
    constructor(products: Product[]) {
      this.products = products;
    }
    calculateTotal(): number {
      return this.products.reduce(
        (total: number, product: Product): number => total + product.price,
        0,
      );
    }
  }
  const products: Product[] = [
    new Product("Mouse", 100),
    new Product("Keyboard", 200),
    new Product("Monitor", 500),
  ];
  const order = new Order(products);
  console.log("Total:", order.calculateTotal());