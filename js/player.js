
// BARRA MULTIPLAYER // 
const musicas = document.querySelectorAll('.musica-item');
const nomeMusica = document.getElementById('nome-musica');
const nomeArtista = document.getElementById('nome-artista');
const capaMusica = document.getElementById('capa-musica');
const playBtn = document.getElementById('btn-play');
const audioPlayer = document.getElementById('audio-player');
const volumeRange = document.querySelector('footer input[type="range"]');
const prevBtn = document.getElementById('btn-prev');
const nextBtn = document.getElementById('btn-next');
const shuffleBtn = document.getElementById('btn-shuffle');
const repeatBtn = document.getElementById('btn-repeat');

let modoShuffle = false;
let modoRepeat = false;


// Variável pra guardar se está tocando
let isPlaying = false;

// Quando clicar, carrega a música no player e toca
musicas.forEach(card => {
    card.addEventListener('click', () => {
        const musicaUrl = card.dataset.src;
        const titulo = card.dataset.titulo;
        const artista = card.dataset.artista;
        const capa = card.dataset.capa;

        // Atualiza as informações do player
        nomeMusica.textContent = titulo;
        nomeArtista.textContent = artista;
        capaMusica.src = capa;
        capaMusica.classList.remove('capa-oculta');

        // Define a música no audio player
        audioPlayer.src = musicaUrl;
        audioPlayer.play();

        // Mostra a barra do player
        document.querySelector('.player-bar').style.display = 'flex';

        isPlaying = true;
        playBtn.classList.remove('bi-play-circle-fill');
        playBtn.classList.add('bi-pause-circle-fill');
        // ajusta a altura da sidebar
        ajustarAlturaSideBar(true);
    });
});

// Controla o botão play/pause da barra
playBtn.addEventListener('click', () => {
    if (!audioPlayer.src) return; // Não tem música carregada

    if (isPlaying) {
        audioPlayer.pause();
        playBtn.classList.remove('bi-pause-circle-fill');
        playBtn.classList.add('bi-play-circle-fill');
    } else {
        audioPlayer.play();
        playBtn.classList.remove('bi-play-circle-fill');
        playBtn.classList.add('bi-pause-circle-fill');
    }
    isPlaying = !isPlaying;
});

// Controla o volume via range
volumeRange.addEventListener('input', () => {
    audioPlayer.volume = volumeRange.value / 100;
});

// Barra de progresso da música 
const barraProgresso = document.getElementById('barra-progresso');
const progressBar = document.getElementById('progress');

audioPlayer.addEventListener('timeupdate', () => {
    if (audioPlayer.duration) {
        const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.style.width = `${percent}%`;
        tempoAtual.textContent = formatarTempo(audioPlayer.currentTime);
    }
});

// Quando a música carrega, define a duração
audioPlayer.addEventListener('loadedmetadata', () => {
    duracaoTotal.textContent = formatarTempo(audioPlayer.duration);
});

// Permite clicar na barra para mudar a posição da música
barraProgresso.addEventListener('click', (e) => {
    const largura = barraProgresso.clientWidth;
    const cliqueX = e.offsetX;
    const porcentagem = cliqueX / largura;
    const novoTempo = porcentagem * audioPlayer.duration;
    audioPlayer.currentTime = novoTempo;
});

const tempoAtual = document.getElementById('tempo-atual');
const duracaoTotal = document.getElementById('duracao-total');

// Formata segundos em mm:ss
function formatarTempo(segundos) {
    const min = Math.floor(segundos / 60);
    const sec = Math.floor(segundos % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
}

// Quando carrega os metadados (duração total disponível)
audioPlayer.addEventListener('loadedmetadata', () => {
    duracaoTotal.textContent = formatarTempo(audioPlayer.duration);
});

// Atualiza tempo atual conforme a música toca
audioPlayer.addEventListener('timeupdate', () => {
    tempoAtual.textContent = formatarTempo(audioPlayer.currentTime);

    if (audioPlayer.duration) {
        const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.style.width = `${percent}%`;
    }
});

const playerBar = document.querySelector('.player-bar');
const sideBar = document.querySelector('.side-bar');

// Ativa o padding apenas quando o player estiver tocando ou visível
function ajustarAlturaSideBar(comPlayerVisivel) {
    const sideBar = document.querySelector('.side-bar');
    const alturaPlayer = 80; // altura aproximada do player

    if (comPlayerVisivel) {
        // Reduz a altura da side-bar, considerando o player
        sideBar.style.height = `calc(100vh - ${alturaPlayer}px - 65px)`;
    } else {
        // Side-bar ocupa altura total da tela
        sideBar.style.height = `calc(100vh - 10px)`; // -10px por causa do margin-top
    }
}

// BOTÃO PLAYER //
const playBannerBtn = document.getElementById('play-banner');

let musicaAtual = 0;

function tocarMusica(index) {
    const item = musicas[index];
    if (!item) return;

    const src = item.dataset.src;
    const titulo = item.dataset.titulo;
    const artista = item.dataset.artista;
    const capa = item.dataset.capa;

    // Atualiza a barra do player
    audioPlayer.src = src;
    audioPlayer.play();

    // Atualiza os elementos do rodapé (título, artista, imagem)
    document.getElementById('nome-musica').textContent = titulo;
    document.getElementById('nome-artista').textContent = artista;
    document.getElementById('capa-musica').src = capa;
    capaMusica.classList.remove('capa-oculta');

    // Mostra a barra do player
    document.querySelector('.player-bar').style.display = 'flex';

    isPlaying = true;
    playBtn.classList.remove('bi-play-circle-fill');
    playBtn.classList.add('bi-pause-circle-fill');

    // Ajusta a altura da sidebar
    ajustarAlturaSideBar(true);

    musicaAtual = index;
}

playBannerBtn.addEventListener('click', () => {
    tocarMusica(0); // começa pela primeira
});

// Botão Anterior
prevBtn.addEventListener('click', () => {
    if (musicaAtual > 0) {
        tocarMusica(musicaAtual - 1);
    }
});

// Botão Próxima
nextBtn.addEventListener('click', () => {
    if (modoShuffle) {
        tocarMusica(Math.floor(Math.random() * musicas.length));
    } else if (musicaAtual + 1 < musicas.length) {
        tocarMusica(musicaAtual + 1);
    }
});

// Botão Shuffle
shuffleBtn.addEventListener('click', () => {
    modoShuffle = !modoShuffle;
    shuffleBtn.classList.toggle('btn-ativo', modoShuffle); 
});

// Botão Repeat
repeatBtn.addEventListener('click', () => {
    modoRepeat = !modoRepeat;
    repeatBtn.classList.toggle('btn-ativo', modoRepeat);
});

// Lógica do botão repeat, toca a próxima musica quando acaba e atualiza o botão quando a lista acabar
audioPlayer.addEventListener('ended', () => {
    if (modoRepeat) {
        tocarMusica(musicaAtual); // repete a atual
    } else if (modoShuffle) {
        tocarMusica(Math.floor(Math.random() * musicas.length));
    } else if (musicaAtual + 1 < musicas.length) {
        tocarMusica(musicaAtual + 1);
    } else {
        isPlaying = false;
        playBtn.classList.remove('bi-pause-circle-fill');
        playBtn.classList.add('bi-play-circle-fill');
    }
});

