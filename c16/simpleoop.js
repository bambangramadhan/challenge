class CarFactory {
  constructor(){
    this.avanzaList = [];
    this.lamborghiniList = [];
  }

  static random() {
    const number = Math.floor(Math.random() * 30);
    return number;
  }

  produce(){
    for(let i = 0; i < CarFactory.random(); i++){
      this.avanzaList.push(new Avanza(5, 7, 1500));
      this.lamborghiniList.push(new Lamborghini(2, 2, 9500));
    }
  }

  hasilProduksi(){
    // print list list yang telah dibuat
    console.log(CarFactory.random());
    for (var i = 0; i < 1; i++) {
      console.log(this.avanzaList[i].name);
      console.log(this.avanzaList[i].doors);
      console.log(this.avanzaList[i].seat);
      console.log(this.avanzaList[i].cc);
      console.log(this.avanzaList[i].tyre);
      console.log(this.lamborghiniList[i].name);
      console.log(this.lamborghiniList[i].doors);
      console.log(this.lamborghiniList[i].seat);
      console.log(this.lamborghiniList[i].cc);
      console.log(this.lamborghiniList[i].tyre);
    }
  }
}

class Car {
  constructor(doors, seat, cc){
    this.doors = doors;
    this.seat = seat;
    this.cc = cc;
  }
}

class Tyre{
  constructor(merk){
    this.merk = merk
  }
}

class Avanza extends Car {
  constructor(doors, seat, cc, tyre, name){
    super(doors, seat, cc);
    this.tyre = new Tyre("bridgestone");
    this.name = "Avanza";
  }
}

class Lamborghini extends Car {
  constructor(doors, seat, cc, tyre, name){
    super(doors, seat, cc);
    this.tyre = new Tyre("michelintyre");
    this.name = "Lamborghini";
  }
}


let factory = new CarFactory();
factory.produce();
factory.hasilProduksi();
