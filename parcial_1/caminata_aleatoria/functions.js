function caminata(){
  var cont_out = 0;
  for(ii = 0; ii < 5000; ii++){
    var a = 0;
    var b = 0;
    for(i = 0; i < 10; i+=1){
      var random_num = Math.floor(Math.random() * 4);
      // console.log(random_num);
      if(random_num == 0){
        a += 1;
      }
      if(random_num == 1){
        b += 1;
      }
      if(random_num == 2){
        a -= 1;
      }
      if(random_num == 3){
        b -= 1;
      }

    }
    if(a > 2 || b > 2 || a < -2 || b < -2 || (a > 1 && b > 1) || (a > 1 && b < -1) || (a < -1 && b > 1) || (a < -1 && b < -1)){
      cont_out ++;
    }
  }
  console.log(cont_out)
  var porcentaje = ((5000 - cont_out)/5000) * 100;
  console.log(porcentaje)
}

caminata();
