function deretKaskus(n) {

    for( var i = 3;  i <= n * 3;  i += 3 ) {
        if( i % 5 === 0 && i % 6 === 0){
            console.log('Kaskus');
    }   else if ( i % 5 === 0){
            console.log('Kas');
    }   else if ( i % 6 === 0 ){
            console.log('Kus');
    } else {
    console.log(i);
}}}

  console.log(deretKaskus(10));
