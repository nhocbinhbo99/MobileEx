abstract class Appliance {
    abstract turnOn(): void;
  }
  class Fan extends Appliance{
    turnOn(): void {
      console.log("Fan turn on");
    }
  }
  class AirConditioner extends Appliance{
    turnOn(): void {
      console.log("Air conditioner turned on");
    }
  }
  const fan = new Fan();
  const airConditioner = new AirConditioner();
  fan.turnOn();
  airConditioner.turnOn();