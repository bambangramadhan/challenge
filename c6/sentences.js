function stringManipulation(word){
  if (word[0] == 'a' || word[0] == 'i' || word[0] == 'u' || word[0] == 'e' ||
  word[0] == 'o'){
    return word;
  } else {
    return `${word.substring(1, word.length)}${word[0]}nyo`;
  }

}

function sentencesManipulation(sentence){
  var array = sentence.split(" ");
  var hasil = [];
  for (i = 0; i < array.length; i++){
    hasil.push(stringManipulation(array[i]));
  }
  return hasil.join(" ");
}

console.log(sentencesManipulation('ibu pergi ke pasar bersama aku'));
