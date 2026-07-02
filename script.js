/*

    - DOCUMENTO JAVASCRIPT DE PROCESSAMENTO DE APOSTAS -

    Criado por: André Lucas
    Data: 29/06/2026

*/

/* ====================================================== */

/* DECLARAÇÃO DE VARIÁVEIS GLOBAIS */


let saldo = 500;
let aposta = 0;
let ganho = 0;

let time1 = "";
let time2 = "";

let forcaSel = 0;
let forcaNaoSel = 0;

let timeSelecionado = null; 

const obbs = [1.85, 2.40, 2.20, 2.10, 2.60, 2.50, 3.20, 3.00, 5.20, 6.30, 8.00, 12.00, 18.00, 15.00, 9.50, 8.50, 4.80, 5.80, 6.50, 4.60, 5.50, 4.80, 9.00, 7.50, 2.80];
const times = ["Brasil", "Alemanha", "Argentina", "França", "Espanha", "Inglaterra", "Portugal", "Itália", "Marrocos", "Senegal", "Japão", "Cabo Verde", "Congo", "Bósnia", "Paraguai", "Austrália", "EUA", "México", "Colômbia", "Bélgica", "Suíça", "Uruguai", "Egito", "Equador", "Holanda"];


const buttonTime1 = document.getElementById("time1");
const buttonTime2 = document.getElementById("time2");
const pGanho = document.getElementById("ganho");
const inputAposta = document.getElementById("valorAposta");
const buttonApostar = document.getElementById("apostar");
const pSaldo = document.getElementById("saldo-valor");

const aviso = document.getElementById("aviso");

const placar = document.getElementById("placar");
const pontosTime1 = document.getElementById("placar-time1");
const pontosTime2 = document.getElementById("placar-time2");
const nomeTime1 = document.getElementById("nome-time1");
const nomeTime2 = document.getElementById("nome-time2");
const resultado = document.getElementById("resultado");


/* ====================================================== */

/* FUNÇÕES DE PROCESSAMENTO DE APOSTAS */



function rescreverPagina() {

    time1 = Math.floor(Math.random() * times.length);
    time2 = Math.floor(Math.random() * times.length);
    buttonTime1.textContent = times[time1];
    buttonTime2.textContent = times[time2];

    if (time1 === time2) {
        rescreverPagina();
    }
    
} rescreverPagina();


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

window.addEventListener('DOMContentLoaded', () => {
    rescreverPagina();
});


/* ====================================================== */

/* EVENTOS DO PROGRAMA */



buttonTime1.addEventListener("click", () => {

    timeSelecionado = time1;
    calcularGanho();


    buttonTime1.style.backgroundColor = "#dd6e07";
    buttonTime1.style.color = "#ffffff";
    buttonTime2.style.color = "";
    buttonTime2.style.backgroundColor = "";
});

buttonTime2.addEventListener("click", () => {

    timeSelecionado = time2;
    calcularGanho();

    buttonTime2.style.backgroundColor = "#dd6e07";
    buttonTime2.style.color = "#ffffff";
    buttonTime1.style.color = "";
    buttonTime1.style.backgroundColor = "";
});


buttonApostar.addEventListener("click", () => {});


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