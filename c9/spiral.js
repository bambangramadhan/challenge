function makeBoard(n){
  let board = [];
  let a = 0;
  for(i = 0; i < n; i++){
    board[i] = [];
    for(j = 0; j < n; j++){
      board[i][j] = a;
      a++;
    }
  }
  return board;
}

function spiral(param1) {
  let hasil = [];
  let array = makeBoard(param1);
  let panjangHasil = param1 * param1;
  let batasAtas = param1;
  let batasBawah = 0;
  let x = 0;
  let y = 0;

  while(true){
    // ke kanan
    for (; x < batasAtas; x++){
      hasil.push(array[y][x]);
      if(panjangHasil == hasil.length){
        return hasil;
      }
    }
    x--;
    y++;

    // ke bawah
    for (; y < batasAtas; y++){
      hasil.push(array[y][x]);
      if(panjangHasil == hasil.length){
        return hasil;
      }
    }
    x--;
    y--;

    // ke kiri
    for (; x >= batasBawah; x--){
      hasil.push(array[y][x]);
      if(panjangHasil == hasil.length){
        return hasil;
      }
    }
    x++;
    y--;

    // ke atas
    for (; y > batasBawah; y--){
      hasil.push(array[y][x]);
      if(panjangHasil == hasil.length){
        return hasil;
      }
    }
    y++;
    x++;
    batasAtas--;
    batasBawah++;
  }
}

console.log(spiral(5));
console.log(spiral(6));
console.log(spiral(7));
