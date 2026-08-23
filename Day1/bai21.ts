class Repository<T>{
    private items: T[] = [];
    add(item: T): void {
      this.items.push(item);
    }
    getAll(): T[] {
      return this.items;
    }
  }
  const repository = new Repository<string>();
  repository.add("Book 1");
  repository.add("Book 2");
  console.log(repository.getAll());