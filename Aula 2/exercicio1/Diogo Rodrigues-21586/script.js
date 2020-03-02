function lerInput() {
    var texto = document.getElementById("numero").value;
    if(!texto.length) alert("Sem Conteudo no Input");
    document.getElementById("texto").innerText = texto;
}