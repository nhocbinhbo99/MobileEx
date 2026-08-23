class Logger{
    private static instance: Logger | undefined;
    private constructor() {}
    static getInstance(): Logger{
      if (!Logger.instance) {
        Logger.instance = new Logger();
      }
      return Logger.instance;
    }
    log(message: string): void {
      console.log(message);
    }
  }
  const logger1 = Logger.getInstance();
  const logger2 = Logger.getInstance();
  logger1.log("Chaof Logger");
  console.log(logger1 === logger2);