console.log("está funcionando!");

const string = process.argv[2];

if(!string){
    console.log("Escreva um argumento")
} else {
    console.log(string)
}
