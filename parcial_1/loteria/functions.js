function mismo_numero(numero){
  var random_num = 0;
  var ganaste = 0;
  var probabilidad_ganaste = 0;
  for(int i = 0; i < 5000 ; i++){
    random_num = Math.floor(Math.random() * 50000);
    if(random_num == numero){
      ganaste =+ 1;
    }
  }
  probabilidad_ganaste = (ganaste/5000) * 100;
}
