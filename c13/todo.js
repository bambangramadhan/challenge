let param = process.argv;
const fs = require('fs');

function read() {
  let data = fs.readFileSync('data.json', 'utf8');
  return JSON.parse(data);
}

function save(data){
  fs.writeFileSync('data.json', JSON.stringify(data, null, 3), 'utf8');
}

let data = [];
let count = param[3];

switch (param[2]) {
  case 'add':
  let content = param.slice(3).join(' ');
  data = read();
  data.push({task: content, complete: false, tags:[]});
  save(data);
  console.log(`"${content}" telah ditambahkan.`);
  break;

  case 'list':
  data = read();
  console.log('Daftar Pekerjaan');
  if(data.length > 0){
    for(let i = 0; i < data.length; i++){
      console.log(`${i + 1}. ${data[i].complete ? '[x]' : '[ ]'} ${data[i].task}.`);
    }
  }else{
    console.log('-- data kosong --');
  }
  break;

  case 'delete':
  data = read();
  if (count <= data.length && count > 0){
    console.log(`"${data[count - 1].task}" telah dihapus dari daftar`);
    data.splice(count - 1, 1);
    save(data);
  } else {
    console.log('Tidak ada data yang dihapus dari daftar');
  }
  break;

  case 'complete':
  data = read();
  data[count - 1].complete = true;
  save(data);
  console.log(`"${data[count - 1].task}" telah selesai`);
  break;

  case 'uncomplete':
  data = read();
  data[count - 1].complete = false;
  save(data);
  console.log(`"${data[count - 1].task}" status selesai dibatalkan`);
  break;

  case 'list:outstanding':
  data = read();
  if(count == 'asc'){
    for(let i = 0; i < data.length; i++){
      if(data[i].complete == false){
        console.log(`${i + 1}. ${data[i].complete ? '[x]' : '[ ]'} ${data[i].task}`);
      }
    }
  }else if(count == 'desc'){
    for(let i = data.length - 1; i >= 0; i--){
      if(data[i].complete == false){
        console.log(`${i + 1}. ${data[i].complete ? '[x]' : '[ ]'} ${data[i].task}`);
      }
    }
  }else{
    console.log('write "node todo.js help" for more info');
  }
  break;

  case 'list:completed':
  data = read();
  if(count == 'asc'){
    for(let i = 0; i < data.length; i++){
      if(data[i].complete == true){
        console.log(`${i + 1}. ${data[i].complete ? '[x]' : '[ ]'} ${data[i].task}`);
      }
    }
  }else if(count == 'desc'){
    for(let i = data.length - 1; i >= 0; i--){
      if(data[i].complete == true){
        console.log(`${i + 1}. ${data[i].complete ? '[x]' : '[ ]'} ${data[i].task}`);
      }
    }
  }else{
    console.log('write "node todo.js help" for more info');
  }
  break;

  case 'tag':
  data = read();
  let potong = param.slice(4);
  if(count <= data.length && count > 0){
    data[count - 1].tags = potong;
    save(data);
    console.log(`Tag "${potong}" telah ditambahkan ke daftar "${data[count - 1].task}"`);
  }else{
    console.log('Anda memasukan "id" yang salah');
  }
  break;

  case 'filter':
  data = read();


  default:
  console.log('>>> JS TODO <<<');
  console.log('$ node todo.js <command>');
  console.log('$ node todo.js list');
  console.log('$ node todo.js task <task_id>');
  console.log('$ node todo.js add <task_content>');
  console.log('$ node todo.js delete <task_id>');
  console.log('$ node todo.js complete <task_id>');
  console.log('$ node todo.js uncomplete <task_id>');
  console.log('$ node todo.js list:outstanding asc|desc');
  console.log('$ node todo.js list:completed asc|desc');
  console.log('$ node todo.js tag <tag_id> <tag_name_1> <tag_name_2> ... <tag_name_N>');
  console.log('$ node todo.js filter:<tag_name>');
}
