import {MesinHitung, PI} from './mesinhitung';

let mh = new MesinHitung();
mh.tambah(10).kurang(5).result();
mh.tambah(3).kali(4).bagi(6).result();
mh.x = 7;
console.log(`nilai sekarang : ${mh.x}`);
mh.kali(2).kali(PI).result();
mh.x = 7;
mh.pangkat2().kali(PI).result();
mh.x = 4;
mh.pangkat(3).result();
mh.akar().result();
