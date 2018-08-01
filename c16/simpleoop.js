class CarFactory {
  constructor(){
    this.avanzaList = [];
    this.lamborghinilist = [];
  }

  static random() {
    const number = Math.floor(Math.random() * 30);
    return number;
  }

  produce(){
    for(let i = 0; i < CarFactory.random(); i++){
      this.avanzaList.push(new Avanza(5, 7, 1500));
      this.lamborghinilist.push(new Lamborghini(2, 2, 9500));
    }
  }

  hasilProduksi(){
    // print list list yang telah dibuat
    console.log(CarFactory.random());
    for (var i = 0; i < 1; i++) {
      console.log(this.lamborghinilist[i].name);
      console.log(this.lamborghinilist[i].doors);
      console.log(this.lamborghinilist[i].seat);
      console.log(this.lamborghinilist[i].cc);
      console.log(this.lamborghinilist[i].tyre);
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
