let intervaloContador;
let t_id;

// Gerenciamento Inteligente do Estado da Música (Mantém tocando entre páginas)
window.addEventListener('DOMContentLoaded', () => {
    const musica = document.getElementById('musicaParabens');
    const icone = document.getElementById('iconeMusica');
    
    // Verifica se a música deve estar tocando de acordo com a sessão anterior
    if (sessionStorage.getItem('musicaTocando') === 'true' && musica) {
        musica.currentTime = parseFloat(sessionStorage.getItem('musicaTempo') || 0);
        musica.play().catch(() => sessionStorage.setItem('musicaTocando', 'false'));
        if (icone) icone.innerText = "🎵";
    }

    // Salva a posição da música de forma contínua antes de mudar de página
    setInterval(() => {
        if (musica && !musica.paused) {
            sessionStorage.setItem('musicaTempo', musica.currentTime);
        }
    }, 500);

    // Liga o contador se estiver na página inicial
    if (document.getElementById('contador')) {
        intervaloContador = setInterval(atualizarContador, 1000);
        atualizarContador();
    }
});

// Mensagem Dinâmica na Aba do Navegador
const tituloOriginal = document.title;
window.addEventListener('blur', () => { document.title = "Volta aqui, sinto sua falta! ❤️"; });
window.addEventListener('focus', () => { document.title = tituloOriginal; });

function navegarPara(url) {
    window.location.href = url;
}

function atualizarContador() {
    const dataAlvo = new Date("OUTUBRO 25, 2026 23:59:59").getTime();

    const atualizarContador = setInterval(() => {
      const agora = new Date().getTime();
      const distancia = dataAlvo - agora;

      if (distancia < 0) {
        clearInterval(atualizarContador);
        document.getElementById("contador").innerHTML = "O tempo acabou! FELIZ ANIVERSÁRIO";
        return;
      }

      const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
      const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

      document.getElementById("contador").innerHTML = 
        `${dias}d ${horas}h ${minutos}m ${segundos}s`;
    }, 1000);
}

function alternarMusica() {
    const musica = document.getElementById('musicaParabens');
    const icone = document.getElementById('iconeMusica');
    if (!musica || !icone) return;

    if (!musica.paused) {
        musica.pause();
        icone.innerText = "🔇";
        sessionStorage.setItem('musicaTocando', 'false');
    } else {
        musica.play().catch(e => console.log("Áudio bloqueado"));
        icone.innerText = "🎵";
        sessionStorage.setItem('musicaTocando', 'true');
    }
}

function surpresaRomantica() {
    const musica = document.getElementById('musicaParabens');
    const icone = document.getElementById('iconeMusica');
    if (musica && musica.paused) {
        musica.play().catch(e => console.log("Erro áudio"));
        if (icone) icone.innerText = "🎵";
        sessionStorage.setItem('musicaTocando', 'true');
    }
    lancarMisto();
}

function lancarMisto() {
    const cores = ['#ff4757', '#ff6b81', '#ff7f50', '#ffa502', '#ff6b9d', '#ffeedd'];
    const tipos = ['confete', 'romantico'];
    const emojisRomanticos = ['❤️', '💖', '💘', '🥰', '✨', '💝'];

    for (let i = 0; i < 100; i++) {
        const elemento = document.createElement('div');
        elemento.classList.add('elemento');
        const tipoAtual = tipos[Math.floor(Math.random() * tipos.length)];
        
        if (tipoAtual === 'confete') {
            elemento.style.width = Math.random() * 8 + 6 + 'px';
            elemento.style.height = Math.random() * 8 + 6 + 'px';
            elemento.style.backgroundColor = cores[Math.floor(Math.random() * cores.length)];
            elemento.style.borderRadius = Math.random() > 0.5 ? '50%' : '0px';
        } else {
            elemento.innerText = emojisRomanticos[Math.floor(Math.random() * emojisRomanticos.length)];
            elemento.style.fontSize = Math.random() * 18 + 12 + 'px';
        }
        
        elemento.style.left = Math.random() * 100 + 'vw';
        elemento.style.animationDuration = (Math.random() * 3 + 2.5) + 's';
        elemento.style.animationDelay = (Math.random() * 1.5) + 's';
        elemento.style.opacity = Math.random() * 0.7 + 0.3;
        
        document.body.appendChild(elemento);
        setTimeout(() => elemento.remove(), 5500);
    }
}

function revelarMensagem(idSurpresa) {
    const modal = document.getElementById("janelaSurpresa");
    const imagem = document.getElementById("imagemSurpresa");
    const textoEl = document.getElementById("textoSurpresa");
    if (!modal || !imagem || !textoEl) return;

    let mensagemCompleta = "";
    if (idSurpresa === 1) {
        imagem.src = "";
        mensagemCompleta = "Meu amor por você é como o código mais perfeito já escrito: não tem falhas, roda perfeitamente no meu coração todos os dias e foi feito para durar uma vida inteira. Obrigado por ser minha melhor conexão! 💻❤️✨";
    } else if (idSurpresa === 2) {
        imagem.src = "";
        mensagemCompleta = "Você é a engrenagem que faz o meu mundo girar e a força que me move para frente nos momentos mais difíceis. Do seu lado, sinto que podemos construir o futuro mais incrível que existe! 🤖💝🚀";
    } else if (idSurpresa === 3) {
        imagem.src = "";
        mensagemCompleta = "Minha vida era em preto e branco antes de você chegar, mas você trouxe as cores mais lindas, vibrantes e profundas para o meu mundo. Feliz aniversário, você é a minha obra-prima favorita! 🎨🥰💖";
    }

    modal.style.display = "flex";
    clearInterval(t_id);
    textoEl.innerText = "";
    let index = 0;
    
    t_id = setInterval(() => {
        if (index < mensagemCompleta.length) {
            textoEl.innerText += mensagemCompleta.charAt(index);
            index++;
        } else {
            clearInterval(t_id);
        }
    }, 30);
}

function fecharSurpresa() {
    const modal = document.getElementById("janelaSurpresa");
    if (modal) modal.style.display = "none";
    clearInterval(t_id);
}

// Carrossel de Fotos
let slideAtual = 0;
function mudarSlide(direcao) {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;
    slides[slideAtual].classList.remove('active', 'ativo');
    slideAtual += direcao;
    if (slideAtual >= slides.length) slideAtual = 0;
    if (slideAtual < 0) slideAtual = slides.length - 1;
    slides[slideAtual].classList.add('ativo');
}

// Quiz
function verificarResposta(botao, eCorreta) {
    const resultado = document.getElementById('resultadoQuiz');
    if (eCorreta) {
        resultado.innerText = "Acertou! Você lembra perfeitamente 🥰🎉";
        resultado.style.color = "#2ed573";
        lancarMisto();
    } else {
        resultado.innerText = "Hum, não foi aí... Tenta de novo! 👀";
        resultado.style.color = "#ff4757";
    }
}

// Botão que Foge
function fugirBotao() {
    const btnNao = document.getElementById('btnNao');
    if (!btnNao) return;
    const x = Math.random() * 160 - 80; 
    const y = Math.random() * 80 - 40;
    btnNao.style.transform = `translate(${x}px, ${y}px)`;
}

function aceitouFoge() {
    alert("Eba! Eu já sabia que a resposta seria essa! Te amo Incodicionalmente! 💖💍");
    lancarMisto();
}

window.onclick = function(event) {
    const modal = document.getElementById("janelaSurpresa");
    if (modal && event.target === modal) {
        modal.style.display = "none";
        clearInterval(t_id);
    }
}
