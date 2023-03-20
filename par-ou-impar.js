const devsChoice = process.argv[2];
const devNumber = process.argv[3];

function getRndNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let cpuNumber = getRndNum(1, 5);

if(!devsChoice || !devNumber){
    console.log(`Escreva par ou ímpar e um número para começar o jogo.`)
}else{
    if ((devNumber + cpuNumber) % 2 === 0) {
        console.log("Soma par!");
        if (devsChoice.toLowerCase() === "par") {
          console.log(`Computador escolheu o número ${cpuNumber}. Você GANHOU!`);
        } else {
          console.log(`Computador escolheu o número ${cpuNumber}. Você PERDEU!`);
        }
      } else if ((devNumber + cpuNumber) % 2 !== 0) {
        console.log("Soma ímpar!");
        if (devsChoice.toLowerCase() === "ímpar") {
          console.log(`Computador escolheu o número ${cpuNumber}. Você GANHOU!`);
        } else {
          console.log(`Computador escolheu o número ${cpuNumber}. Você PERDEU!`);
        }
      }
}