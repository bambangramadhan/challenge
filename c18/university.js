const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./universitas.db');
const Table = require('cli-table')

function showLogin(){
  console.log('==================================================================');
  console.log('Welcome to Universitas Pendidikan Indonesia');
  console.log('Jl Setiabudhi No 255');
  console.log('==================================================================');
  inputUsername();
}

function inputUsername(){
  rl.question('Username : ', (username) => {
    cekUsername(username);
  });
}

function cekUsername(uname){
  let sql = `SELECT * FROM login`;
  db.all(sql, (err, user) => {
    for (var i = 0; i < user.length; i++) {
      if(user[i].username == uname){
        inputPassword(user, uname);
      }
    }
    inputUsername();
  });
}

function inputPassword(user, uname){
  rl.question('Password : ', (pass) => {
    let cek = 0;
    for (var i = 0; i < user.length; i++) {
      if(user[i].username == uname && user[i].password == pass){
        cek = 1;
        break;
      }
    }
    if(cek == 1){
      menuUtama(uname);
    }else{
      inputPassword(user, uname);
    }
  });
}

function menuUtama(user){
  console.log('==================================================================');
  console.log(`Welcome, ${user}. Your access level is : ADMIN`);
  console.log('==================================================================');
  console.log('silahkan pilih opsi dibawah ini');
  console.log('[1] Mahasiswa');
  console.log('[2] Jurusan');
  console.log('[3] Dosen');
  console.log('[4] Mata kuliah');
  console.log('[5] Kontrak');
  console.log('[6] Keluar');
  access();
}

function access(){
  console.log('==================================================================');
  rl.question('masukkan salah satu no. dari salah satu opsi diatas : ', (pilih) => {
    cekMenu(pilih);
  });
}

function cekMenu(nomor){
  switch (nomor) {
    case '1':
    mahasiswaMenu();
    break;
    case '2':
    jurusanMenu();
    break;
    case '3':
    dosenMenu();
    break;
    case '4':
    matkulMenu();
    break;
    case '5':
    kontrakMenu();
    break;
    case '6':
    inputUsername();
    break;
    default:
    menuUtama();
    break;
  }
}

function mahasiswaMenu(){
  console.log('==================================================================');
  console.log('silahkan pilih opsi dibawah ini');
  console.log('[1] daftar murid');
  console.log('[2] cari murid');
  console.log('[3] tambah murid');
  console.log('[4] hapus murid');
  console.log('[5] kembali');
  masuk();
}

function masuk(){
  console.log('==================================================================');
  rl.question('masukkan salah satu no. dari opsi diatas : ', (pilih) => {
    cekMahasiswa(pilih)
  })
};

function cekMahasiswa(nomor){
  switch(nomor){
    case '1':
    daftarMurid();
    break;
    case '2':
    cariMurid();
    break;
    case '3':
    tambahNim();
    break;
    case '4':
    hapusMurid();
    break;
    case '5':
    menuUtama();
    break;
    default:
    mahasiswaMenu();
    break;
  }
}

function daftarMurid(){
  let sql = 'SELECT * FROM mahasiswa, jurusan WHERE mahasiswa.kode_jurusan = jurusan.kode_jurusan ';
  db.all(sql, (err, rows) => {
    let table = new Table({
      head: ['NIM','Nama','Alamat','Jurusan']
    });
    rows.forEach((row) => {
      table.push([row.nim, row.nama_mahasiswa, row.alamat, row.nama_jurusan])
    })
    console.log(table.toString());
    cekMahasiswa();
  });
}

function cariMurid(){
  rl.question('Masukkan NIM : ', (pilih) => {
    cekNim(pilih)
  })
}

function cekNim(nonim){
  let sql = `SELECT * FROM mahasiswa, jurusan WHERE nim = '${nonim}' AND mahasiswa.kode_jurusan = jurusan.kode_jurusan`;
  db.all(sql, (err, mhs) => {
    if(mhs.length > 0){
      console.log('===============================================================');
      console.log('Student Details');
      console.log('===============================================================');
      console.log(`nim : ${mhs[0].nim}`);
      console.log(`nama : ${mhs[0].nama_mahasiswa}`);
      console.log(`alamat : ${mhs[0].alamat}`);
      console.log(`jurusan : ${mhs[0].nama_jurusan}`);
      mahasiswaMenu();
    }else{
      console.log(`mahasiswa dengan nim ${nonim} tidak terdaftar`);
      console.log('================================================================');
      cariMurid();
    }
  });
}

function tambahNim(){
  console.log('Lengkapi data dibawah ini : ');
  rl.question('NIM : ', (nim) => {
    tambahNama(nim)
  })
}

function tambahNama(nim){
  rl.question('Nama : ', (nama) => {
    tambahAlamat(nim,nama)
  })
}

function tambahAlamat(nim,nama){
  rl.question('Alamat : ', (alamat) => {
    tambahNajurusan(nim,nama,alamat)
  })
}

function tambahNajurusan(nim,nama,alamat){
  rl.question('Kode Jurusan : ', (jurusan) => {
    tambahMurid(nim,nama,alamat,jurusan)
  })
}

function tambahMurid(nim,nama,alamat,jurusan){
  console.log('===================================================================');
  db.run('INSERT INTO mahasiswa (nim,nama_mahasiswa,alamat,kode_jurusan) VALUES (?,?,?,?)',  [nim,nama,alamat,jurusan])
  daftarMurid();
}

function hapusMurid(){
  console.log('====================================================================');
  rl.question('Masukkan nim mahasiswa yang akan dihapus : ', (pilih) => {
    cekMurid(pilih)
  })
}

function cekMurid(nonim){
  let sql = `SELECT * FROM mahasiswa WHERE nim = ${nonim}`;
  db.all(sql, (err,mhs) => {
    if(mhs.length > 0){
      console.log(`Mahasiswa dengan nim : ${nonim} telah dihapus.`);
      dropOut(nonim);
    } else {
      console.log(`Mahasiswa dengan nim ${nonim} tidak terdaftar`);
      hapusMurid();
    }
  })
}

function dropOut(nim){
  db.run('DELETE FROM mahasiswa WHERE nim = ?', [nim])
  console.log('====================================================================');
  daftarMurid();
}

function jurusanMenu(){
  console.log('==================================================================');
  console.log('silahkan pilih opsi dibawah ini');
  console.log('[1] daftar jurusan');
  console.log('[2] cari jurusan');
  console.log('[3] tambah jurusan');
  console.log('[4] hapus jurusan');
  console.log('[5] kembali');
  masukk();
}

function masukk(){
  console.log('===================================================================');
  rl.question('masukkan salah satu no. dari opsi diatas : ', (pilih) => {
    cekJurusan(pilih)
  })
}

function cekJurusan(no) {
  switch(no){
    case '1':
    daftarJurusan();
    break;
    case '2':
    cariJurusan();
    break;
    case '3':
    tambahNojur();
    break;
    case '4':
    hapusJurusan();
    break;
    case '5':
    menuUtama();
    break;
    default:
    jurusanMenu();
    break;
  }
}

function daftarJurusan() {
  let sql = 'SELECT * FROM jurusan';
  db.all(sql, (err,rows) => {
    let table = new Table({
      head: ['No Jurusan', 'Nama Jurusan']
    })
    rows.forEach((row) => {
      table.push([row.kode_jurusan, row.nama_jurusan])
    })
    console.log(table.toString());
    jurusanMenu()
  })
}

function cariJurusan() {
  rl.question('Masukkan No Jurusan : ', (pilih) => {
    cekNojur(pilih)
  })
}

function cekNojur(kojur){
  let sql = `SELECT * FROM jurusan WHERE kode_jurusan = ${kojur}`;
  db.all(sql, (err,jrs) => {
    if(jrs.length > 0){
      console.log('=============================================================');
      console.log('Majors Details');
      console.log('==============================================================');
      console.log(`No Jurusan : ${jrs[0].kode_jurusan}`);
      console.log(`Nama Jurusan : ${jrs[0].nama_jurusan}`);
      cekJurusan();
    }else{
      console.log(`No Jurusan : ${kojur} tidak terdaftar`);
      console.log('==============================================================');
      cariJurusan();
    }
  })
}

function tambahNojur() {
  console.log('Lengkapi data dibawah ini : ');
  rl.question('No jurusan : ', (nojur) => {
    tambahNajur(nojur)
  })
}

function tambahNajur(nojur){
  rl.question('Nama jurusan : ', (najur) => {
    tambahJurusan(nojur,najur)
  })
}

function tambahJurusan(nojur,najur) {
  db.run('INSERT INTO jurusan (kode_jurusan,nama_jurusan) VALUES (?,?)', [nojur,najur])
  console.log('===================================================================');
  daftarJurusan();
}

function hapusJurusan() {
  console.log('===================================================================');
  rl.question('Masukkan no jurusan yang akan dihapus : ', (pilih) =>{
    cekJur(pilih);
  })
}

function cekJur(kojur) {
  let sql =`SELECT * FROM jurusan WHERE kode_jurusan = ${kojur}`;
  db.all(sql,(err,jrs) => {
    if(jrs.length > 0){
      console.log(`Jurusan dengan No Jurusan : ${kojur} telah dihapus`);
      keluarJur(kojur);
    }else{
      console.log(`Jurusan dengan No Jurusan : ${kojur} tidak terdaftar`);
      hapusJurusan();
    }
  })
}

function keluarJur(kojurus) {
  db.run('DELETE FROM jurusan WHERE kode_jurusan = ?', [kojurus])
  console.log('===================================================================');
  daftarJurusan();
}

function dosenMenu(){
  console.log('==================================================================');
  console.log('silahkan pilih opsi dibawah ini');
  console.log('[1] daftar dosen');
  console.log('[2] cari dosen');
  console.log('[3] tambah dosen');
  console.log('[4] hapus dosen');
  console.log('[5] kembali');
  masukkk();
}

function masukkk(){
  console.log('===================================================================');
  rl.question('masukkan salah satu no. dari opsi diatas : ', (pilih) => {
    cekDosen(pilih)
  })
}

function cekDosen(no) {
  switch(no){
    case '1':
    daftarDosen();
    break;
    case '2':
    cariDosen();
    break;
    case '3':
    tambahNip();
    break;
    case '4':
    hapusDosen();
    break;
    case '5':
    menuUtama();
    break;
    default:
    dosenMenu();
    break;
  }
}

function daftarDosen() {
  let sql = 'SELECT * FROM dosen';
  db.all(sql, (err,rows) => {
    let table = new Table({
      head: ['NIP', 'Nama Dosen']
    })
    rows.forEach((row) => {
      table.push([row.nip, row.nama_dosen])
    })
    console.log(table.toString());
    dosenMenu()
  })
}

function cariDosen() {
  rl.question('Masukkan NIP : ', (pilih) => {
    cekNip(pilih)
  })
}

function cekNip(nip){
  let sql = `SELECT * FROM dosen WHERE nip = ${nip}`;
  db.all(sql, (err,dsn) => {
    if(dsn.length > 0){
      console.log('=============================================================');
      console.log('Lecturer Details');
      console.log('==============================================================');
      console.log(`NIP : ${dsn[0].nip}`);
      console.log(`Nama Dosen : ${dsn[0].nama_dosen}`);
      cekDosen();
    }else{
      console.log(`NIP : ${nip} tidak terdaftar`);
      console.log('==============================================================');
      cariDosen();
    }
  })
}

function tambahNip() {
  console.log('Lengkapi data dibawah ini : ');
  rl.question('NIP : ', (nip) => {
    tambahNados(nip)
  })
}

function tambahNados(nip){
  rl.question('Nama dosen : ', (nados) => {
    tambahDosen(nip,nados)
  })
}

function tambahDosen(nip,nados) {
  db.run('INSERT INTO dosen (nip,nama_dosen) VALUES (?,?)', [nip,nados])
  console.log('===================================================================');
  daftarDosen();
}

function hapusDosen() {
  console.log('===================================================================');
  rl.question('Masukkan nip yang akan dihapus : ', (pilih) =>{
    cekDos(pilih);
  })
}

function cekDos(nipdos) {
  let sql =`SELECT * FROM dosen WHERE nip = ${nipdos}`;
  db.all(sql,(err,dsn) => {
    if(dsn.length > 0){
      console.log(`Dosen dengan NIP : ${nipdos} telah dihapus`);
      keluarDos(nipdos);
    }else{
      console.log(`Dosen dengan NIP : ${nipdos} tidak terdaftar`);
      hapusDosen();
    }
  })
}

function keluarDos(nipdos) {
  db.run('DELETE FROM dosen WHERE nip = ?', [nipdos])
  console.log('===================================================================');
  daftarDosen();
}

function kontrakMenu(){
  console.log('==================================================================');
  console.log('silahkan pilih opsi dibawah ini');
  console.log('[1] daftar kontrak');
  console.log('[2] cari kontrak');
  console.log('[3] tambah kontrak');
  console.log('[4] hapus kontrak');
  console.log('[5] kembali');
  masukkkk();
}

function masukkkk(){
  console.log('==================================================================');
  rl.question('masukkan salah satu no. dari opsi diatas : ', (pilih) => {
    cekKontrak(pilih)
  })
};

function cekKontrak(nomor){
  switch(nomor){
    case '1':
    daftarKontrak();
    break;
    case '2':
    cariKontrak();
    break;
    case '3':
    tambahMhskon();
    break;
    case '4':
    hapusKontrak();
    break;
    case '5':
    menuUtama();
    break;
    default:
    kontrakMenu();
    break;
  }
}

function daftarKontrak(){
  let sql = 'SELECT * FROM mahasiswa, matakuliah, dosen, mengontrak WHERE mahasiswa.nim = mengontrak.nim AND matakuliah.kode_matkul = mengontrak.kode_matkul AND dosen.nip = mengontrak.nip';
  db.all(sql, (err, rows) => {
    let table = new Table({
      head: ['Mahasiswa','Mata Kuliah','Dosen','Nilai']
    });
    rows.forEach((row) => {
      table.push([row.nama_mahasiswa, row.nama_matkul, row.nama_dosen, row.nilai])
    })
    console.log(table.toString());
    cekKontrak();
  });
}

function cariKontrak(){
  rl.question('Masukkan NIM : ', (pilih) => {
    cekKon(pilih)
  })
}


function cekKon(nonim){
  let sql = `SELECT mahasiswa.nama_mahasiswa, matakuliah.nama_matkul, dosen.nama_dosen, mengontrak.nilai FROM mahasiswa, matakuliah, dosen, mengontrak WHERE mahasiswa.nim = ${nonim} AND matakuliah.kode_matkul = mengontrak.kode_matkul AND dosen.nip = mengontrak.nip`;
  db.all(sql, (err, ktk) => {
    if(ktk.length > 0){
      console.log('===============================================================');
      console.log('Contract Details');
      console.log('===============================================================');
      console.log(`Mahasiswa : ${ktk[0].nama_mahasiswa}`);
      console.log(`Mata Kuliah : ${ktk[0].nama_matkul}`);
      console.log(`Dosen : ${ktk[0].nama_dosen}`);
      console.log(`Nilai : ${ktk[0].nilai}`);
      kontrakMenu();
    }else{
      console.log(`mahasiswa dengan nim ${nonim} tidak terdaftar`);
      console.log('================================================================');
      cariKontrak();
    }
  });
}

function tambahMhskon(){
  console.log('Lengkapi data dibawah ini : ');
  rl.question('NIM Mahasiswa : ', (mhs) => {
    tambahMatkulkon(mhs)
  })
}

function tambahMatkulkon(mhs){
  rl.question('Kode Matakuliah : ', (matkul) => {
    tambahDoskon(mhs,matkul)
  })
}

function tambahDoskon(mhs,matkul){
  rl.question('NIP Dosen : ', (dos) => {
    tambahNilaikon(mhs,matkul,dos)
  })
}

function tambahNilaikon(mhs,matkul,dos){
  rl.question('Nilai : ', (nilai) => {
    tambahKontrak(mhs,matkul,dos,nilai)
  })
}

function tambahKontrak(mhs,matkul,dos,nilai){
  console.log('===================================================================');
  db.run('INSERT INTO mengontrak (nim,kode_matkul,nip,nilai) VALUES (?,?,?,?)',  [mhs,matkul,dos,nilai])
  daftarKontrak();
}


function hapusKontrak(){
  console.log('====================================================================');
  rl.question('Masukkan nim mahasiswa yang akan dihapus : ', (nim) => {
    cekHakon(nim)
  })
}

function cekHakon(nim){
  let sql = `SELECT * FROM mengontrak WHERE mengontrak.nim = ${nim}`;
  db.all(sql, (err,ktk) => {
    if(ktk.length > 0){
      console.log(`Mahasiswa dengan nim : ${nim} telah dihapus.`);
      dropOutkon(nim);
    } else {
      console.log(`Mahasiswa dengan nim : ${nim} tidak terdaftar`);
      hapusKontrak();
    }
  })
}

function dropOutkon(nim){
  db.run('DELETE FROM mengontrak WHERE nim = ?', [nim])
  console.log('====================================================================');
  daftarKontrak();
}

function matkulMenu(){
  console.log('===================================================================');
  console.log('silahkan pilih opsi dibawah ini');
  console.log('[1] daftar matkul');
  console.log('[2] cari matkul');
  console.log('[3] tambah matkul');
  console.log('[4] hapus matkul');
  console.log('[5] keluar');
  masukkkkk()
}

function masukkkkk() {
  console.log('=====================================================================');
  rl.question('masukkan salah satu no dari opsi diatas : ', (pilih) => {
    cekMatkul(pilih)
  })
}

function cekMatkul(no) {
  switch (no) {
    case '1':
    daftarMatkul();
    break;
    case '2':
    cariMatkul();
    break;
    case '3':
    tambahKomat();
    break;
    case '4':
    hapusMatkul();
    break;
    case '5':
    menuUtama();
    break;
    default:
    matkulMenu();
    break;
  }
}

function daftarMatkul() {
  let sql = 'SELECT * FROM matakuliah'
  db.all(sql,(err,rows) => {
    let table = new Table({
      head: ['Kode Matkul', 'Matkul']
    })
    rows.forEach((row) => {
      table.push([row.kode_matkul, row.nama_matkul])
    })
    console.log(table.toString());
    matkulMenu();
  })
}

function cariMatkul(){
  console.log('===================================================================');
  rl.question('Masukkan kode matkul : ', (pilih) => {
    cekKomat(pilih);
  })
}

function cekKomat(komat) {
  let sql = `SELECT * FROM matakuliah WHERE kode_matkul = ${komat}`
  db.all(sql,(err,mtk) => {
    if(mtk.length > 0){
      console.log('================================================================');
      console.log('courses details');
      console.log('================================================================');
      console.log(`Kode Matkul : ${mtk[0].kode_matkul}`);
      console.log(`Mata Kuliah : ${mtk[0].nama_matkul}`);
      matkulMenu();
    }else{
      console.log(`Mata kuliah dengan kode : ${komat} tidak terdaftar`);
      cariMatkul();
    }
  })
}

function tambahKomat(){
  console.log('===================================================================');
  console.log('Lengkapi data dibawah ini :');
  rl.question('Kode Matkul : ', (komat) => {
    tambahNammat(komat)
  })
}

function tambahNammat(komat) {
  rl.question('Mata Kuliah : ', (matkul) => {
    tambahMatkul(komat,matkul)
  })
}

function tambahMatkul(komat,matkul){
  console.log('===================================================================');
  db.run(`INSERT INTO matakuliah (kode_matkul,nama_matkul) VALUES (?,?)`, [komat,matkul])
  daftarMatkul()
}

function hapusMatkul(){
  console.log('======================================================================');
  rl.question('Masukkan Kode Matkul yang akan dihapus : ', (pilih) => {
    cekHakul(pilih)
  });
}

function cekHakul(komat){
  let sql = `SELECT * FROM matakuliah WHERE kode_matkul = ${komat}`;
  db.all(sql,(err,mtk) => {
    if(mtk.length > 0){
      console.log(`Mata Kuliah dengan kode matkul : ${komat} telah dihapus`);
      dropMatkul(komat);
    }else{
      console.log(`Mata Kuliah dengan kode matkul : ${komat} tidak terdaftar`);
      hapusMatkul()
    }
  })
}

function dropMatkul(komat){
  db.run(`DELETE FROM matakuliah WHERE kode_matkul = ${komat}`)
  console.log('====================================================================');
  daftarMatkul();
}
showLogin();
