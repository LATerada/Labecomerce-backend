const devsChoise = process.argv[2];

function getRndNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const verifyCpusChoice = (choice) => {
  switch (choice) {
    case 1:
      return "rock";
    case 2:
      return "paper";
    case 3:
      return "scissors";
  }
};
let cpusChoise = verifyCpusChoice(getRndNum(1, 3));
console.log(`Computer chose ${cpusChoise}.`);

devsChoise && devsChoise === cpusChoise
  ? console.log(`It's a TIE!`)
  : (devsChoise === "rock" && cpusChoise === "paper") ||
    (devsChoise === "scissors" && cpusChoise === "rock") ||
    (devsChoise === "paper" && cpusChoise === "scissors")
  ? console.log(`Oh no! YOU LOST!`)
  : console.log(`YOU WON!`);
