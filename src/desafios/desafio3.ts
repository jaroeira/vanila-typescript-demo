// O código abaixo tem alguns erros e não funciona como deveria. Você pode identificar quais são e corrigi-los em um arquivo TS?

const botaoAtualizar = document.getElementById(
  'atualizar-saldo'
) as HTMLButtonElement;
const botaoLimpar = document.getElementById(
  'limpar-saldo'
) as HTMLButtonElement;
const soma = document.getElementById('soma') as HTMLInputElement;
const campoSaldo = document.getElementById('campo-saldo') as HTMLSpanElement;

campoSaldo.innerHTML = '0';

function somarAoSaldo(soma: number) {
  campoSaldo.innerHTML += soma;
}

function limparSaldo() {
  campoSaldo.innerHTML = '';
}

botaoAtualizar.addEventListener('click', function () {
  somarAoSaldo(+soma.value);
});

botaoLimpar.addEventListener('click', function () {
  limparSaldo();
});

export {};

/**
    <h4>Valor a ser adicionado: <input id="soma"> </h4>
    <button id="atualizar-saldo">Atualizar saldo</button>
    <button id="limpar-saldo">Limpar seu saldo</button>
    <h1>"Seu saldo é: " <span id="campo-saldo"></span></h1>
 */
