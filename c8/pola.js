function pola (str){
  let pecahan1 = str.split("=");
  let a = pecahan1[1].trim();
  let pecahan2 = str.split("*");
  let b = pecahan2[0].trim();
  let c = pecahan2[1].trim();

  for (i = 0; i < 10; i++) {
    for (j = 0; j < 10; j++) {
      if (parseInt(b.replace("#",i))*
      parseInt(c) ==
      parseInt(a.replace("#",j)))
      {
        return [i,j];
      }
    }
  }
}

console.log(pola("42#3 * 188 = 80#204"));
console.log(pola("8#61 * 895 = 78410#5"));
