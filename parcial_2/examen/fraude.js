const bins = [
  {"bin": 517712, "bank": "BANAMEX"},
  {"bin": 520416, "bank": "BANAMEX"},
  {"bin": 520694, "bank": "BANAMEX"},
  {"bin": 520698, "bank": "BANAMEX"},
  {"bin": 525678, "bank": "BANAMEX"},
  {"bin": 554492, "bank": "BANAMEX"},
  {"bin": 421003, "bank": "BANBAJIO"},
  {"bin": 402766, "bank": "BANCO AZTECA"},
  {"bin": 551238, "bank": "BANCO AZTECA"},
  {"bin": 557604, "bank": "BANCO AZTECA"},
  {"bin": 553467, "bank": "BANCO AZTECA"},
  {"bin": 400819, "bank": "BANCOPPEL"},
  {"bin": 416916, "bank": "BANCOPPEL"},
  {"bin": 491566, "bank": "BANORTE"},
  {"bin": 433114, "bank": "BANORTE"},
  {"bin": 491340, "bank": "BANORTE"},
  {"bin": 474174, "bank": "BANREGIO"},
  {"bin": 533609, "bank": "BANCOMER"},
  {"bin": 441313, "bank": "BANCOMER"},
  {"bin": 409851, "bank": "BANCOMER"},
  {"bin": 415231, "bank": "BANCOMER"},
  {"bin": 455511, "bank": "BANCOMER"},
  {"bin": 421316, "bank": "HSBC"},
  {"bin": 483030, "bank": "HSBC"},
  {"bin": 491089, "bank": "HSBC"},
  {"bin": 465828, "bank": "INBURSA"},
  {"bin": 433454, "bank": "IXE"},
  {"bin": 533987, "bank": "MONEX"},
  {"bin": 426808, "bank": "MULTIVA"},
  {"bin": 557907, "bank": "SANTANDER"},
  {"bin": 557909, "bank": "SANTANDER"},
  {"bin": 557910, "bank": "SANTANDER"},
  {"bin": 557905, "bank": "SANTANDER"},
  {"bin": 417849, "bank": "LIVERPOOL"},
  {"bin": 123456, "bank": "GASOLINA"}, // Este me lo inventé
  {"bin": 234567, "bank": "SORIANA"} // ESte obviamente también
];

const A = 314;
const C = 453;
const M = 2147483648;
const CANT_TARJETAS_REAL = 50000;
const CANT_TARJETAS_FAKE = 7000;
var I1 = 753363737;
var I2 = 701747156;
var concat;
var bin;
var rand1;
var rand2;




var luhnChk = (function (arr) {
  return function (ccNum) {
    var
    len = ccNum.length,
    bit = 1,
    sum = 0,
    val;
    while (len) {
      val = parseInt(ccNum[--len], 10);
      sum += (bit ^= 1) ? arr[val] : val;
    }
    return sum && sum % 10 === 0;
  };
}([0, 2, 4, 6, 8, 1, 3, 5, 7, 9]));

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateCard() {
  bin = bins[getRandomInt(0, bins.length-1)].bin.toString();

  do {
    rand1 = ((A * I1) + C) % M;
    rand2 = ((A * I2) + C) % M;

    I1++;
    I2++;

    concat = bin;
    concat += rand1.toString().slice(0, 5);
    concat += rand2.toString().slice(-5);
    concat = parseInt(concat);
  } while (luhnChk(concat.toString().split("")) == false);

  return concat;
}


function complete_card(){
  var tarjetas = [];
  for(var i = 0; i < CANT_TARJETAS_REAL ; i++){
    var numero = generateCard();
    var mes = getRandomInt(1, 12);
    var ano = getRandomInt(2010, 2018);
    var saldo = getRandomInt(0, 50000);
    var real = 1;

    var tarjeta = {numero: numero, mes: mes, ano: ano, saldo:saldo, real: real};
    tarjetas.push(tarjeta);
  }
  for(var i = 0; i < CANT_TARJETAS_FAKE ; i++){
    var numero = generateCard();
    var mes = getRandomInt(1, 6);
    var ano = getRandomInt(2018, 2018);
    var saldo = 100; //getRandomInt(0, 500);
    var real = 0;

    var tarjeta = {numero: numero, mes: mes, ano: ano, saldo:saldo, real: real};
    tarjetas.push(tarjeta);
  }
  // for (var i = 0; i < tarjetas.length; i++) {
  //   console.log(tarjetas[i].numero + "  -  " +  tarjetas[i].mes + "  -  " + tarjetas[i].ano + "  -  " + tarjetas[i].saldo);
  // }
  return tarjetas;
}


var tarjetas = complete_card();


function elbin_sospechoso(num, bins){
  num = num.toString();
  num = num.substring(0, 6);
  for (var i=0; i < bins.length; i++) {
      if (bins[i].bin == num) {
          if( bins[i].bank == "MONEX" || bins[i].bank == "BANCOMER" || bins[i].bank == "BANAMEX" || bins[i].bank == "SORIANA" || bins[i].bank == "GASOLINA" || bins[i].bank == "LIVERPOOL" ){
            return true;
          }
      }
  }
  return false;
}


function es_frudulenta(tarjeta){
  if(tarjeta.mes >= 0 && tarjeta.mes <= 6){
    if(tarjeta.ano == 2018){
      if((tarjeta.saldo%25) == 0){
        if(elbin_sospechoso(tarjeta.numero, bins)){
          if(tarjeta.saldo <= 5000){
            return true;
          }
        }
      }
    }
  }
}

function fraude( tarjetas ){
  var fraudulentas = [];
  var dinero_fraud = 0;
  for(var i = 0; i < tarjetas.length ; i++ ){
    if( es_frudulenta(tarjetas[i]) ){
      fraudulentas.push(tarjetas[i]);
      console.log(tarjetas[i].numero + "  -  " +  tarjetas[i].mes + "  -  " + tarjetas[i].ano + "  -  " + tarjetas[i].saldo  + "  -  " + tarjetas[i].real);
      dinero_fraud += tarjetas[i].saldo ;
    }
  }
  document.getElementById("cant_dinero_fraudulentas").innerHTML = dinero_fraud;
  document.getElementById("cant_fraudulentas").innerHTML = fraudulentas.length;
}

fraude(tarjetas);
