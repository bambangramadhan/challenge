function cekPrima( n ) {
  var max = Math.sqrt(n);
  for( var i = 2;  i <= max;  i++ ) {
    if( n % i == 0 )
    return false;
  }
  return true;
}

function indexPrime(param1){
  let mulai = 2;
  let count = 0;
  while (count != param1){
    if (cekPrima(mulai)){
      count++;
    }
    mulai++;
  }
  return mulai - 1;
}

console.log(indexPrime(4));
console.log(indexPrime(500));
console.log(indexPrime(3776));
