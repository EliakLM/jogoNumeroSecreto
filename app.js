// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do Número Secreto';

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 a 10';
let listaNumerosAleatorios = [];
let numeroLimite = 10;
let numeroAleatorio = gerarNumeroAleatorio();
let tentativas = 1;
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2} );
};

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do Número');
    exibirTextoNaTela('p', 'Escolha entre 1 a 10');
}

exibirMensagemInicial();

function verificarChute(){
    let chuteUsuario = (document.querySelector("input").value);

    if(chuteUsuario==numeroAleatorio){
        exibirTextoNaTela('h1', 'Acertou!!');
        let tentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu com ${tentativas} ${tentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');

    }else{
        if(chuteUsuario > numeroAleatorio){
            exibirTextoNaTela("p", "O seu chute foi maior que o número secreto!");
        }else{
            exibirTextoNaTela("p", "O seu chute foi menor que o número secreto!");
        }
    }
    tentativas++;
    limparCampo();
};

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let qtdElementosLista = listaNumerosAleatorios.length;

    if(qtdElementosLista == numeroLimite){
        listaNumerosAleatorios = [];
    };

    if(listaNumerosAleatorios.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else {
        listaNumerosAleatorios.push(numeroEscolhido)
        return numeroEscolhido;
    }
};

function limparCampo() { 
    chuteUsuario = document.querySelector("input");
    chuteUsuario.value = "";

};

function reiniciarJogo(){
    numeroAleatorio = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
};
