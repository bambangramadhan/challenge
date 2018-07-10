function weirdMultiply(sentence){
  let angkaString = sentence.toString();
  let hasil = 1;
  for (i = 0; i < angkaString.length; i++){
    hasil *= angkaString[i];
  }
  if (hasil.toString().length == 1){
    return hasil;
  } else {
    return weirdMultiply(hasil);
  }
}

console.log(weirdMultiply(39));
console.log(weirdMultiply(999));
console.log(weirdMultiply(3));
