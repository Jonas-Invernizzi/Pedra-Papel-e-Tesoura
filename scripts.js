const form = document.getElementById("formulario")
const jogada = document.getElementById("jogada")
const retorno = document.getElementById("retorno")
const terminar = document.getElementById("Terminar")
const Tesoura = document.getElementById("Tesoura")
const Pedra = document.getElementById("Pedra")
const Papel = document.getElementById("Papel")
const btnIniciar = document.getElementById("Inicio")
const zerar = document.getElementById("Reiniciar")
const controles = document.getElementById("controles")
const V = document.getElementById("1")
const E = document.getElementById("2")
const D = document.getElementById("3")
var num = 0;
const Resultado = document.getElementById('Resultado')
const titulo = document.querySelector('h1') // Mantido, mas não controlado

btnIniciar.addEventListener('click', async () => {
    const respostas = await fetch('jogar.php')
    const data = await respostas.json()
    if (data) {
        btnIniciar.classList.toggle('esconder')
        form.classList.toggle('esconder')
        controles.classList.toggle('esconder')
        
        // Apenas Resultado é controlado para aparecer
        Resultado.classList.remove('esconder') 
    }
})
zerar.addEventListener('click', async () => {
    const respostas = await fetch('zerar.php')
    const data = await respostas.json()
    V.innerText = "0"
    E.innerText= "0"
    D.innerText= "0"
    jogada.innerText = "";
    retorno.innerText = "";
    Resultado.innerText = "";
})
terminar.addEventListener('click', async () => {
    const respostas = await fetch('zerar.php')
    const data = await respostas.json()
    V.innerText = "0"
    E.innerText= "0"
    D.innerText= "0"
    jogada.innerText = "";
    retorno.innerText = "";
    Resultado.innerText = "";
    
    // Apenas Resultado é controlado para sumir
    Resultado.classList.add('esconder')
    
    btnIniciar.classList.toggle('esconder')
    form.classList.toggle('esconder')
    controles.classList.toggle('esconder') 
    num = 0; 
})
Pedra.addEventListener('click',()=>{
    num = 1
    jogada.innerText = "Pedra";
})
Papel.addEventListener('click',()=>{
    num = 2
    jogada.innerText = "Papel";
})
Tesoura.addEventListener('click',()=>{
    num = 3
    jogada.innerText = "Tesoura";
})
form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const body = new FormData()
    body.set('palpite', +num)

    const resposta = await fetch('acao.php', {
        method: 'post',
        body
    })

    const data = await resposta.json()
    
    if(num === 1) jogada.innerText = "Pedra";
    else if(num === 2) jogada.innerText = "Papel";
    else if(num === 3) jogada.innerText = "Tesoura";

    switch(data.jogada_antiga){
        case 1:retorno.innerText = "Pedra";
        break;
        case 2:retorno.innerText = "Papel";
        break;
        case 3:retorno.innerText = "Tesoura";
        break;
    }
    if(data.status == 0){
    Resultado.innerText= "Você acabou empatando"
    E.innerText = data.ata 
    }
    else if(data.status == 1){
    Resultado.innerText= "Perdeu, mais sorte na próxima vez!" 
    D.innerText = data.ata 
    }
    else{ 
    Resultado.innerText= "Você ganhou, Parabéns"
    V.innerText = data.ata 
}
    num = 0; 
})