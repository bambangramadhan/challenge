const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Tebakan: '
});

const fs = require('fs');
let data = JSON.parse(fs.readFileSync('data.json','utf8'));
let count = 0;

console.log('Selamat datang di permainan Tebak Kata, silahkan isi dengan jawaban yang benar ya!');
console.log(`\nPertanyaan: ${data[count].definition}`);
rl.prompt();

rl.on('line', (answer) => {
  if(answer.trim() == data[count].term){
    console.log('Selamat anda benar!');

    count++;
    if(count == data.length){
      console.log('\nHore anda menang!');
      process.exit(0);
    } else {
      console.log(`\nPertanyaan: ${data[count].definition}`);
    }

  } else {
    console.log('Wkwkwkwk, anda kurang beruntung!\n');
  }
  rl.prompt();

}).on('close', () => {
  console.log('Have a great day!');
  process.exit(0);
});
