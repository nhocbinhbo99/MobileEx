class User{
  private name: string;
  constructor(name: string){
    this.name = name;
  }
  getName(): string{
    return this.name;
  }
  setName(name: string): void{
    this.name = name;
  }
}
const user = new User("Cong");
console.log(user.getName());
user.setName("Thanh Cong");
console.log(user.getName());