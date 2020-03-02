var arrayNumbers = [];

function adicionarNumero(){
    var numero= document.getElementById("numberId").value;

    arrayNumbers.push(parseInt(numero));
    document.getElementById("numerosAdicionados").innerText= arrayNumbers.toString();
    //console.log(arrayNumbers);
}

function calcularNumero() {
    if(arrayNumbers.length > 5) {
        var maiorNumero = Math.max.apply(Math, arrayNumbers);
        alert(maiorNumero);
    }
}