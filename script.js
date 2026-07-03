/*

    - DOCUMENTO JAVASCRIPT DE PROCESSAMENTO DE APOSTAS -

    Criado por: André Lucas
    Data: 29/06/2026

*/

/* ====================================================== */

/* DECLARAÇÃO DE VARIÁVEIS GLOBAIS */


/* Variáveis de controle do sistema - - - - */
let saldo = 500;
let aposta = 0;
let ganho = 0;

let time1 = "";
let time2 = "";

let pontos1 = 0;
let pontos2 = 0;

let timeSelecionado = null; 
let timeNaoSelecionado = null;

const obbs = [1.85, 2.40, 2.20, 2.10, 2.60, 2.50, 3.20, 3.00, 5.20, 6.30, 8.00, 12.00, 18.00, 15.00, 9.50, 8.50, 4.80, 5.80, 6.50, 4.60, 5.50, 4.80, 9.00, 7.50, 2.80];
const times = ["Brasil", "Alemanha", "Argentina", "França", "Espanha", "Inglaterra", "Portugal", "Itália", "Marrocos", "Senegal", "Japão", "Cabo Verde", "Congo", "Bósnia", "Paraguai", "Austrália", "EUA", "México", "Colômbia", "Bélgica", "Suíça", "Uruguai", "Egito", "Equador", "Holanda"];


/* Elementos do DOM - - - - - - - - - - - - - */
const buttonTime1 = document.getElementById("time1");
const buttonTime2 = document.getElementById("time2");
const pGanho = document.getElementById("ganho");
const inputAposta = document.getElementById("valorAposta");
const buttonApostar = document.getElementById("apostar");
const pSaldo = document.getElementById("saldo-valor");

const status = document.getElementById("status");
const aviso = document.getElementById("aviso");

const placar = document.getElementById("placar");
const pontosTime1 = document.getElementById("placar-time1");
const pontosTime2 = document.getElementById("placar-time2");
const nomeTime1 = document.getElementById("nome-time1");
const nomeTime2 = document.getElementById("nome-time2");
const resultado = document.getElementById("resultado");



/* ========================================================== */

/* FUNÇÕES DE PROCESSAMENTO DE APOSTAS */


/* Função para gerar um número aleatório - - - - - - - - - - - */
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/* Função para reescrever a página com novos times e odds - - */
function prepararJogo() {

    time1 = randomNum(0, times.length - 1);
    time2 = randomNum(0, times.length - 1);
    buttonTime1.textContent = times[time1];
    buttonTime2.textContent = times[time2];
    nomeTime1.textContent = times[time1];
    nomeTime2.textContent = times[time2];
    pontosTime1.textContent = "0";
    pontosTime2.textContent = "0";

    resultado.textContent = "Quem ganhará?";

    if (time1 === time2) {
        prepararJogo();
    }
    
} prepararJogo();


/* Função para calcular o possível ganho da aposta - - - - - - */
function calcularGanho() {

    aposta = parseFloat(inputAposta.value);
    ganho = aposta * obbs[timeSelecionado];

    if (inputAposta.value.trim() === "") {
        pGanho.textContent = "Possível ganho: $0.00";
        aviso.style.display = "none";
    } 
    
    else if (Number.isNaN(ganho)) {
        aviso.textContent = "Não foi possível calcular o ganho!";
        aviso.style.display = "block";
    } 
    
    else {
        pGanho.textContent = `Possível Ganho: $${ganho.toFixed(2)}`;
        aviso.style.display = "none";
    }

}


/* Função para apresentar o resultado do jogo - - - - - - - - */
function apresentarResultado() {

    // declarando variáveis de controle do placar
    let forcaSelecionado = 1 / obbs[timeSelecionado];
    let forcaNaoSelecionado = 1 / obbs[timeNaoSelecionado];
    let tempoAnterior = 0;
    let tempo = 0;
    let inclinacao = 0;

    // revelando placar
    placar.style.display = "flex";

    // animando entrada do placar
    setTimeout(() => {
        placar.style.transition = "rotate 0.1s ease";
        placar.style.transform = "rotate(8deg)";
        setTimeout(() => {
            placar.style.transition = "transform 0.5s ease";
            placar.style.transform = "scale(1.5)";
        }, 100);
    }, 100); 


    // loop para atualizar o placar várias vezes
    for (let i = 0; i < randomNum(1, 6); i++) {

        // calculando tempo de atualização do placar
        tempo = randomNum(600, 4000);
        tempo = tempo + tempoAnterior;
        tempoAnterior = tempo;

        console.log(`randomNum: ${randomNum(0, 100)}, forcaSelecionado: ${forcaSelecionado}, forcaNaoSelecionado: ${forcaNaoSelecionado}, tempo: ${tempo}`);

        

        // agendando atualização do placar após o tempo calculado
        setTimeout(() => {

            // calculando qual time marcou o ponto
            if (randomNum(0, 100) <= (forcaSelecionado / (forcaSelecionado + forcaNaoSelecionado) * 100)) { 
                
                //foi o time selecionado que marcou?

                if (timeSelecionado === time1) {
                    pontos1++;
                } else {
                    pontos2++;
                }
                console.log('Ponto para o time selecionado!');

            } else if (randomNum(0, 100) <= (forcaNaoSelecionado / (forcaSelecionado + forcaNaoSelecionado) * 100)) { 
                
                // foi o time não selecionado que marcou?

                if (timeNaoSelecionado === time2) {
                    pontos2++;
                } else {
                    pontos1++;
                }

                console.log('Ponto para o time não selecionado!');
            }

            // apresentando o placar atualizado no DOM
            pontosTime1.textContent = pontos1;
            pontosTime2.textContent = pontos2;
            
            placar.style.transition = "transform 0.3s ease";

            if (pontos1 > pontos2) {
                resultado.textContent = `${times[time1]} está vencendo!`;
                inclinacao = inclinacao - 3;
            } else if (pontos2 > pontos1) {
                resultado.textContent = `${times[time2]} está vencendo!`;
                inclinacao = inclinacao + 3;
            } else {
                resultado.textContent = "Empate!";
                inclinacao = 0;
            }

            placar.style.transform = "scale(1.2)";
            placar.style.transform = `rotate(${inclinacao}deg)`;

        }, tempo);
    }


    // finalizando o jogo e apresentando o resultado final
    setTimeout(() => {

        placar.style.transition = "transform 0.5s ease";
        placar.style.transform = "scale(1.5)";

        
        if (pontos1 > pontos2 && time1 === timeSelecionado) { 
            // o time 1 venceu? você apostou nele?
            resultado.textContent = `${times[time1]} venceu!`;

            saldo = saldo + ganho + aposta
            pSaldo.textContent = `$ ${saldo}`;

        } else if (pontos2 > pontos1 && time2 === timeSelecionado) { 

            // o time 2 venceu? você apostou nele?
            resultado.textContent = `${times[time2]} venceu!`;

            saldo = saldo + ganho + aposta
            pSaldo.textContent = `$ ${saldo}`;

        } else if (pontos1 === pontos2) { 
            
            // caso haja um empate o jogo recomeça
            resultado.textContent = "Ocorreu um empate...";
            saldo = saldo + aposta;
            pSaldo.textContent = `$ ${saldo}`;

            status.style.display = "block";
            status.textContent = "O jogo empatou, sua aposta não foi considerada!";
            setTimeout(() => {
                status.style.display = "none";
                status.textContent = "";
            }, 3000);

        } else {

            // caso você perca
            status.style.display = "block";
            status.textContent = "Você perdeu sua aposta!";
            setTimeout(() => {
                status.style.display = "none";
                status.textContent = "";
            }, 3000);
        }

        // reiniciando placar
        pontos1 = 0;
        pontos2 = 0;
        tempo = 0;
        tempoAnterior
        inclinacao = 0;
        placar.style.display = "none";
        timeSelecionado = null;
        timeNaoSelecionado = null;
        buttonTime1.style.backgroundColor = "";
        buttonTime2.style.backgroundColor = "";
        buttonTime1.style.color = "black";
        buttonTime2.style.color = "black";
        prepararJogo();

    }, tempo + 1500);

} 


/* Função para confirmar que a página foi reescrita e preparada */
window.addEventListener('DOMContentLoaded', () => {
    prepararJogo();
});



/* ========================================================== */

/* EVENTOS DO PROGRAMA */



/* Eventos de clique nos botões de time - - - - - - - - - */
buttonTime1.addEventListener("click", () => {

    timeSelecionado = time1;
    timeNaoSelecionado = time2;
    calcularGanho();


    buttonTime1.style.backgroundColor = "#dd6e07";
    buttonTime1.style.color = "#ffffff";
    buttonTime2.style.color = "";
    buttonTime2.style.backgroundColor = "";
});

buttonTime2.addEventListener("click", () => {

    timeSelecionado = time2;
    timeNaoSelecionado = time1;
    calcularGanho();

    buttonTime2.style.backgroundColor = "#dd6e07";
    buttonTime2.style.color = "#ffffff";
    buttonTime1.style.color = "";
    buttonTime1.style.backgroundColor = "";
});



/* Evento de clique no botão de apostar - - - - - - - - - */
buttonApostar.addEventListener("click", () => {
    if (timeSelecionado != null && aposta != 0) {

        saldo = saldo - aposta
        pSaldo.textContent = `$ ${saldo}`;
        apresentarResultado();
    } else {
        status.style.display = "block";
        status.textContent = "Selecione um time e digite uma aposta...";
        setTimeout(() => {
            status.style.display = "none";
            status.textContent = "";
        }, 3000);
    }
});



/* Evento de input no campo de aposta - - - - - - - - - - */
inputAposta.addEventListener("input", () => {

    aviso.style.display = "none";
    calcularGanho();

    if (aposta > saldo) {

        aviso.textContent = "Saldo insuficiente!";
        aviso.style.display = "block";
        aposta = saldo;
        inputAposta.value = saldo;

    };
    
    if (aposta < 0) {

        aposta = 0;
        inputAposta.value = 0;

    }

});