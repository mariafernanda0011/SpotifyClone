document.addEventListener('DOMContentLoaded', () => { //Isso garante que o script só seja executado depois que toda a página HTML for carregada.

    const artistData = [
        { name: 'Jorge & Mateus', image: './img/artista-jorge-mateus.jpg', id: 'jm' },
        { name: 'Henrique & Juliano', image: './img/artista-henrique-juliano.jpg', id: 'hj' },
        { name: 'Zé Neto & Cristiano', image: './img/artista-ze-neto.jpg', id: 'znt' },
        { name: 'Gustavo Lima', image: './img/artista-gustavo-limma.jpg', id: 'gl' },
        { name: 'Luan Santana', image: './img/artista-luan-santana.jpg', id: 'ls' },
        { name: 'Matheus & Kauan', image: './img/artista-mateus-kauan.jpg', id: 'mk' }
    ];

    const albumsData = [
        { name: '0 Céu Explica Tudo (Ao Vivo)', artist: 'Henrique & Juliano', image: './img/album-ceu-explica.jpg' },
        { name: 'Nada como um dia após o outro', artist: 'Racionais', image: './img/album-vida-loka.jpg' },
        { name: 'HIT ME HARD AND SOFT', artist: 'Billie Eilish', image: './img/album-hit-me.jpg' },
        { name: 'CAJU', artist: 'Liniker', image: './img/album-caju.jpg' },
        { name: 'Escândalo Íntimo', artist: 'Luísa Sonza', image: './img/album-escandalo.jpg' },
        { name: '333', artist: 'Matuê', image: './img/album-matue.jfif' }
    ];

    const artistGrid = document.querySelector('.artists-grid')
    const albumsGrid = document.querySelector('.albums-grid')

    artistData.forEach(artist => {
        const artistCard = document.createElement('div')
        artistCard.classList.add('artist-card')

        artistCard.innerHTML = `
            <img src="${artist.image}" alt= "Imagem do ${artist.name}">
            <div> 
                <h3 class="fs-5"> ${artist.name} </h3>
                <p> Artista </p>
            </div>
        `
        artistCard.dataset.id = artist.id;
        // Evento para clique no card //
        artistCard.addEventListener('click', () => {
            if (artist.id === 'jm') {
                window.location.href = 'artista-jm.html';
            } else {
                alert(`Página para o artista "${artist.name}" ainda não implementada.`);
            }
        });

        artistGrid.appendChild(artistCard)

    })

    albumsData.forEach(album => {
        const albumCard = document.createElement('div')
        albumCard.classList.add('album-card')

        albumCard.innerHTML = `
            <img src="${album.image}" alt= "Imagem do ${album.name}">
            <div> 
                <h3 class="fs-6"> ${album.name} </h3>
                <p> ${album.artist}  </p>
            </div>
        `
        albumsGrid.appendChild(albumCard)
    })

});