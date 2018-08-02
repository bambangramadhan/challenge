export const PI = 3.14;

export class MesinHitung {
  constructor(){
    this.x = 1;
  }

  static PI(){
    return 3.14
  }

  tambah(angka){
    this.x += angka;
    return this;
  }

  kurang(angka){
    this.x -= angka;
    return this;
  }

  bagi(angka){
    this.x /= angka;
    return this;
  }

  kali(angka){
    this.x *= angka;
    return this;
  }

  akar(){
    this.x = Math.sqrt(this.x);
    return this;
  }

  pangkat2(){
    this.x = Math.pow(this.x, 2)
    return this;
  }

  pangkat(angka){
    this.x = Math.pow(this.x, angka);
    return this;
  }

  result(){
    console.log(this.x);
  }
}
