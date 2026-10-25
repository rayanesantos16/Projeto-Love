
/* Personalize este arquivo com suas mensagens e sua música. */

const mensagensSurpresa = {
  1: "A nossa história é uma das minhas partes favoritas da vida. Obrigada por cada lembrança, cada sorriso e por tudo o que ainda vamos viver. Eu escolheria conhecer você de novo, em cada versão da nossa história. ♥",

  2: "Mais do que namorados, quero que sejamos parceiros: que um apoie o outro nos dias bons e nos difíceis, que a gente converse, aprenda e cresça junto. Você não precisa enfrentar tudo sozinho. ♥",

  3: "Eu amo os nossos detalhes, as nossas brincadeiras, as coisas que só nós entendemos e tudo aquilo que faz a nossa relação ser única. Que nunca nos faltem motivos para sorrir juntos. ♥"
};

let slideAtual = 0;
let musicaTocando = false;

/* Navegação entre páginas */
function navegarPara(pagina) {
  window.location.href = pagina;
}

/* Surpresa de aniversário */
function surpresaRomantica() {
  abrirModal(
    "Eu espero que seu novo ciclo seja tão lindo quanto o carinho que sinto por você. Que você realize seus sonhos, tenha paz no coração e nunca se esqueça do quanto é especial. Feliz aniversário, meu amor! ♥"
  );
}

/* Mensagens surpresa */
function revelarMensagem(numero) {
  abrirModal(
    mensagensSurpresa[numero] ||
    "Você é muito especial para mim. ♥"
  );
}

/* Abrir janela de mensagem */
function abrirModal(mensagem) {
  const modal = document.getElementById("janelaSurpresa");
  const texto = document.getElementById("textoSurpresa");

  if (!modal || !texto) return;

  texto.textContent = mensagem;
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

/* Fechar janela de mensagem */
function fecharSurpresa() {
  const modal = document.getElementById("janelaSurpresa");

  if (modal) {
    modal.style.display = "none";
  }

  document.body.style.overflow = "";
}

/* Fechar com Escape ou clicando fora da mensagem */
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    fecharSurpresa();
  }
});

document.addEventListener("click", (event) => {
  const modal = document.getElementById("janelaSurpresa");

  if (modal && event.target === modal) {
    fecharSurpresa();
  }
});

/* Carrossel de fotos */
function mostrarSlide(indice) {
  const slides = [...document.querySelectorAll(".slide")];

  if (!slides.length) return;

  slideAtual = (indice + slides.length) % slides.length;

  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === slideAtual);
  });

  document.querySelectorAll(".carousel-dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === slideAtual);
  });
}

function mudarSlide(direcao) {
  mostrarSlide(slideAtual + direcao);
}

function prepararCarrossel() {
  const slides = document.querySelectorAll(".slide");
  const dots = document.getElementById("carouselDots");

  if (!slides.length || !dots) return;

  dots.innerHTML = "";

  slides.forEach((_, indice) => {
    const dot = document.createElement("button");

    dot.className =
      "carousel-dot" + (indice === 0 ? " active" : "");

    dot.setAttribute(
      "aria-label",
      `Ir para foto ${indice + 1}`
    );

    dot.addEventListener("click", () => {
      mostrarSlide(indice);
    });

    dots.appendChild(dot);
  });

  mostrarSlide(0);
}

/* Quiz romântico */
function verificarResposta(botao, correta) {
  const resultado = document.getElementById("resultadoQuiz");
  const opcoes = document.querySelectorAll(".quiz-options button");

  if (!resultado) return;

  opcoes.forEach((opcao) => {
    opcao.disabled = true;
    opcao.classList.remove("correct", "incorrect");
  });

  if (correta) {
    botao.classList.add("correct");

    resultado.textContent =
      "Acertou! Você guarda nossas lembranças tão bem quanto eu guardo você no coração. ♥";
  } else {
    botao.classList.add("incorrect");

    resultado.textContent =
      "Quase! Essa é uma boa desculpa para relembrarmos nossa história juntos. ♥";

    const certa = [...opcoes].find((opcao) =>
      opcao.getAttribute("onclick")?.includes("true")
    );

    if (certa) {
      certa.classList.add("correct");
    }
  }
}

/* Botão NÃO que foge */
function fugirBotao() {
  const botao = document.getElementById("btnNao");

  if (!botao) return;

  const margem = 16;

  const maxX = Math.max(
    margem,
    window.innerWidth - botao.offsetWidth - margem
  );

  const maxY = Math.max(
    margem,
    window.innerHeight - botao.offsetHeight - margem
  );

  botao.style.position = "fixed";
  botao.style.left =
    `${margem + Math.random() * (maxX - margem)}px`;

  botao.style.top =
    `${margem + Math.random() * (maxY - margem)}px`;

  botao.style.zIndex = "80";
}

/* Quando a pessoa aceita */
function aceitouFoge() {
  const mensagem = document.getElementById("mensagemFuturo");

  if (mensagem) {
    mensagem.textContent =
      "Então está combinado: que a gente continue escolhendo o amor, cuidando um do outro e escrevendo uma história linda, um dia de cada vez. Eu amo você! ♥";
  }

  criarChuvaDeCoracoes(28);

  const botao = document.getElementById("btnNao");

  if (botao) {
    botao.style.display = "none";
  }
}

/* Chuva de corações */
function criarChuvaDeCoracoes(quantidade = 18) {
  const area =
    document.querySelector(".floating-hearts") ||
    document.body;

  for (let i = 0; i < quantidade; i++) {
    const coracao = document.createElement("span");

    coracao.className = "floating-heart";
    coracao.textContent =
      Math.random() > 0.3 ? "♥" : "✦";

    coracao.style.left = `${Math.random() * 100}%`;

    coracao.style.fontSize =
      `${12 + Math.random() * 20}px`;

    coracao.style.animationDuration =
      `${4 + Math.random() * 5}s`;

    coracao.style.animationDelay =
      `${Math.random() * 1.8}s`;

    area.appendChild(coracao);

    coracao.addEventListener(
      "animationend",
      () => coracao.remove(),
      { once: true }
    );
  }
}

/* Música de aniversário */
function alternarMusica() {
  const audio = document.getElementById("musicaParabens");
  const icone = document.getElementById("iconeMusica");

  if (!audio) {
    alert("Não foi encontrado o elemento de áudio no HTML.");
    return;
  }

  if (audio.paused) {
    audio.play()
      .then(() => {
        musicaTocando = true;

        if (icone) {
          icone.textContent = "Ⅱ";
        }
      })
      .catch(() => {
        alert(
          "Não foi possível tocar a música. Confira se o arquivo nastelbom-happy-birthday-471481.mp3 está na pasta do site."
        );
      });
  } else {
    audio.pause();
    musicaTocando = false;

    if (icone) {
      icone.textContent = "♫";
    }
  }
}

/* Inicialização */
document.addEventListener("DOMContentLoaded", () => {
  prepararCarrossel();

  const audio = document.getElementById("musicaParabens");

  if (audio) {
    audio.loop = true;
    audio.volume = 0.6;
  }

  if (document.querySelector(".floating-hearts")) {
    setTimeout(() => criarChuvaDeCoracoes(12), 500);
  }
});
