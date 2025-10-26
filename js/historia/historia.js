document.addEventListener('DOMContentLoaded', () => {

    // ================================================================
    // 1. ANIMAÇÕES SCROLLREVEAL
    // ================================================================
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            distance: '50px',
            duration: 1200,
            easing: 'ease-out',
            reset: false 
        });

        sr.reveal('.historia-intro-banner h1', { origin: 'left' });
        sr.reveal('.historia-intro-banner .subtitulo-intro', { origin: 'left', delay: 200 });
        sr.reveal('.historia-intro-banner p', { origin: 'left', delay: 350, interval: 100 });
        
        const secoes = document.querySelectorAll('.historia-duas-colunas');

        sr.reveal(secoes[0].querySelector('.coluna-texto'), { origin: 'left' });
        sr.reveal(secoes[0].querySelector('.coluna-imagem-legenda'), { origin: 'right', delay: 200 });

        sr.reveal(secoes[1].querySelector('.coluna-imagem-legenda'), { origin: 'left' });
        sr.reveal(secoes[1].querySelector('.coluna-texto'), { origin: 'right', delay: 200 });
        
        sr.reveal('.faixa-historia', { 
            origin: 'bottom', 
            duration: 1000, 
            distance: '40px',
            delay: 100 
        });

        sr.reveal('.rodape', { origin: 'bottom', duration: 1000, distance: '20px', delay: 200 });
    }

    // ================================================================
    // 2. MODAL DE IMAGENS (Pop-up para .historia-imagem-pessoal)
    // ================================================================
    const modal = document.getElementById('modal-galeria');
    const fecharBtn = document.querySelector('.modal-fechar');
    const modalImagem = document.getElementById('modal-imagem');
    const modalTitulo = document.getElementById('modal-titulo');
    const modalDescricao = document.getElementById('modal-descricao');
    const itensImagem = document.querySelectorAll('.historia-imagem-pessoal');

    itensImagem.forEach(item => {
        item.addEventListener('click', () => {
            const titulo = item.querySelector('.subtitulo-imagem').textContent;
            const descricao = item.querySelector('.legenda-imagem').textContent;
            const imageUrl = item.querySelector('img').src; 

            modalImagem.innerHTML = `<img src="${imageUrl}" alt="${titulo}" onload="this.classList.add('loaded')">`;
            modalTitulo.textContent = titulo;
            modalDescricao.textContent = descricao;

            modal.style.display = 'flex';
        });
    });

    if (fecharBtn) {
        fecharBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.style.display === 'flex') {
                modal.style.display = 'none';
            }
        });
    }
});