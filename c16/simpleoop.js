class CarFactory {
  constructor(){
    this.avanzaList = [];
    this.lamborghiniList = [];
  }

  static random() {
    const number = Math.floor(Math.random() * 30);
    return number;
  }

  produce(year){
    for(let i = 0; i < CarFactory.random(); i++){
      this.avanzaList.push(new Avanza(5, 7, 1500, year));
      this.lamborghiniList.push(new Lamborghini(2, 2, 9500, year));
    }
  }

  produceResult(){
    // print list list yang telah dibuat
    //console.log(CarFactory.random());
    for (var i = 0; i < this.avanzaList.length; i++) {
      console.log(this.avanzaList[i])

    }

    for (var i = 0; i < this.lamborghiniList.length; i++) {
      console.log(this.lamborghiniList[i])
    }

  }

  guaranteeSimulation(year){
    for (var i = 0; i < this.avanzaList.length; i++) {
      console.log(this.avanzaList[i])
      console.log(`this car is ${((year - this.avanzaList[i].year) > this.avanzaList[i].warranty) ? 'expired' : 'not expired'}`);

    }

    for (var i = 0; i < this.lamborghiniList.length; i++) {
      console.log(this.lamborghiniList[i])
      console.log(`this car is ${((year - this.lamborghiniList[i].year) > this.lamborghiniList[i].warranty) ? 'expired' : 'not expired'}`);
    }
  }
}

class Car {
  constructor(doors, seat, cc, warranty, year){
    this.doors = doors;
    this.seat = seat;
    this.cc = cc;
    this.warranty = warranty;
    this.year = year
  }
}

class Tyre{
  constructor(merk){
    this.merk = merk
  }
}

class Avanza extends Car {
  constructor(doors, seat, cc, year){
    super(doors, seat, cc, 3, year);
    this.tyre = new Tyre("bridgestone");
    this.name = "Avanza";
  }
}

class Lamborghini extends Car {
  constructor(doors, seat, cc, year){
    super(doors, seat, cc, 5, year);
    this.tyre = new Tyre("michelintyre");
    this.name = "Lamborghini";
  }
}


let factory = new CarFactory();
factory.produce(2017);
factory.produce(2018);
//factory.produceResult();
factory.guaranteeSimulation(2021);
