document.addEventListener('DOMContentLoaded', () => {

    // ================================================================
    // 1. ANIMAÇÕES SCROLLREVEAL (ATUALIZADO PARA ESPORTES)
    // ================================================================
    if (typeof ScrollReveal !== 'undefined') {
        
        const sr = ScrollReveal({
            distance: '50px', 
            duration: 1200, 
            easing: 'ease-out',
            reset: false 
        });

        sr.reveal('.main-section .main-conteudo', { origin: 'top' });
        sr.reveal('.faixa-extra', { origin: 'bottom', delay: 150 });
        
        sr.reveal('.lazer-intro', { origin: 'left' });
        sr.reveal('.lazer-galeria .lazer-item', { 
            origin: 'bottom',
            interval: 200, 
            delay: 300 
        });

        sr.reveal('.historia-coluna-esquerda', { origin: 'left' });
        sr.reveal('.historia-intro', { origin: 'right', delay: 200 });
        
        sr.reveal('.esportes-header', { origin: 'top' }); 
        sr.reveal('.container-esportes-galeria .esportes-item', { 
            origin: 'bottom',
            interval: 200, 
            delay: 300 
        });
        
        sr.reveal('.rodape', { origin: 'bottom', duration: 800, distance: '20px', delay: 100 });
    }
    
    // ================================================================
    // 2. MODAL DE GALERIA (Pop-up de Imagem) 
    // ================================================================
    
    const modal = document.getElementById('modal-galeria');
    const fecharBtn = modal ? document.querySelector('.modal-fechar') : null;
    const modalContainerImagem = modal ? document.querySelector('.modal-imagem') : null; 
    const modalImagem = modal ? document.getElementById('modal-image') : null; 
    const modalTitulo = modal ? document.getElementById('modal-titulo') : null;
    const modalDescricao = modal ? document.getElementById('modal-descricao') : null;
    const itensGaleria = document.querySelectorAll('.lazer-item, .esportes-item, .historia-coluna-esquerda');

    itensGaleria.forEach(item => {
        item.addEventListener('click', () => {
            let titulo, descricao, imagemElement;

            if (item.classList.contains('historia-coluna-esquerda')) {
                titulo = item.querySelector('.historia-imagem-legenda h4').textContent;
                descricao = item.querySelector('.historia-imagem-legenda p').textContent;
                imagemElement = item.querySelector('.historia-imagem-placeholder');
            } else if (item.classList.contains('lazer-item') || item.classList.contains('esportes-item')) {
                titulo = item.querySelector('.item-titulo').textContent;
                descricao = item.querySelector('.item-info').textContent;
                imagemElement = item.querySelector('.item-imagem-placeholder');
            }
            
            const imageUrl = imagemElement ? imagemElement.src : '';
            const altText = imagemElement ? imagemElement.alt : 'Imagem';

            if (modalImagem && modalTitulo && modalDescricao && modalContainerImagem) {
                modalContainerImagem.classList.add('loading');
                modalImagem.classList.remove('loaded');
                
                modalImagem.onload = () => {
                    modalContainerImagem.classList.remove('loading');
                    modalImagem.classList.add('loaded');
                };

                modalImagem.onerror = () => {
                    modalContainerImagem.classList.remove('loading');
                    modalDescricao.textContent = "Erro ao carregar a imagem.";
                };
                
                modalImagem.src = imageUrl;
                modalImagem.alt = altText;
                modalTitulo.textContent = titulo;
                modalDescricao.textContent = descricao;

                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden'; 
            }
        });
    });

    if (modal && fecharBtn) {
        fecharBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        });

        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.style.display === 'flex') {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }
});