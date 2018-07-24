const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Jawaban: '
});

let param = process.argv;
if(param[2] == null || undefined){
  console.log('Tolong sertakan nama file sebagai inputan soalnya');
  console.log("Misalnya 'node solution.js data.json'");
  process.exit(0);
}
const fs = require('fs');
let data = JSON.parse(fs.readFileSync(param[2],'utf8'));
let count = 0;
let coba = 1;

console.log(`Selamat datang di permainan Tebak-tebakan, kamu akan diberi pertanyaan dari file ini '${param[2]}'.`);
console.log("Untuk bermain, jawablah dengan jawaban yang sesuai.");
console.log("Gunakan 'skip' untuk menangguhkan pertanyaannya dan diakhir pertanyaan akan ditanyakan lagi.");
console.log(`\nPertanyaan: ${data[count].definition}`);
rl.prompt();

rl.on('line', (answer) => {
  if(answer.trim() == 'skip'){
    data.push(data[count]);
    count++;
    console.log(`\nPertanyaan: ${data[count].definition}`);
  }else{
    if(answer.trim() == data[count].term){
      console.log('\nAnda beruntung!');
      count++;
      if(count == data.length){
        console.log('\nAnda berhasil!');
        process.exit(0);
      } else {
        console.log(`\nPertanyaan: ${data[count].definition}`);
      }
    } else {
      console.log(`\nAnda kurang beruntung! anda telah salah ${coba} kali, silahkan coba lagi.`);
      coba++;
    }
  }

  rl.prompt();

}).on('close', () => {
  console.log('Have a great day!');
  process.exit(0);
});
