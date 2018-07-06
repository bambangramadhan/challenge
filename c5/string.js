function stringManipulation(word){
  if (word[0] == 'a' || word[0] == 'i' || word[0] == 'u' || word[0] == 'e' ||
  word[0] == 'o'){
    return word;
  } else {
    return `${word.substring(1, word.length)}${word[0]}nyo`;
  }

}

console.log(stringManipulation('ayam'));
console.log(stringManipulation('bebek'));
