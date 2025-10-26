// ========================================
// ESPORTES.JS
// Funções específicas da página de Esportes
// ========================================

document.addEventListener('DOMContentLoaded', () => {

    // 1. ANIMAÇÕES SCROLLREVEAL
    if (typeof ScrollReveal !== 'undefined') {
        
        // Configuração base
        const defaultProps = {
            duration: 1000,
            distance: '30px',
            easing: 'ease-in-out',
            mobile: true,
            reset: false
        };

        // Revela o texto e imagem do banner separadamente
        ScrollReveal().reveal('.esportes-intro-banner h1', { ...defaultProps, origin: 'left' });
        ScrollReveal().reveal('.esportes-intro-banner .subtitulo-intro', { ...defaultProps, origin: 'left', delay: 200 });

        
        // ANIMAÇÃO DOS BLOCOS ALTERNADOS (AGORA COM 6 SEÇÕES)
        document.querySelectorAll('.esportes-bloco').forEach((section, index) => {
            const containerColunas = section.querySelector('.container-colunas');
            if (!containerColunas) return;

            const isReversed = containerColunas.classList.contains('reverse-desktop');
            
            // Define a direção da animação baseada na ordem do layout (Texto ou Imagem primeiro)
            const textOrigin = isReversed ? 'right' : 'left';
            const imageOrigin = isReversed ? 'left' : 'right';

            // Animação da Coluna de Texto
            const colunaTexto = section.querySelector('.coluna-texto');
            if (colunaTexto) {
                ScrollReveal().reveal(colunaTexto, { 
                    ...defaultProps, 
                    origin: textOrigin,
                    delay: 200
                });
            }

            // Animação da Coluna de Imagem
            const colunaImagem = section.querySelector('.coluna-imagem-legenda');
            if (colunaImagem) {
                ScrollReveal().reveal(colunaImagem, { 
                    ...defaultProps, 
                    origin: imageOrigin,
                    delay: 400 
                });
            }
        });
        
        // Rodapé
        ScrollReveal().reveal('.rodape', { ...defaultProps, origin: 'bottom', distance: '20px', delay: 100 });
    }

    
    // 2. MODAL/GALERIA DE IMAGENS
    function inicializarModalGaleria() {
        const modal = document.getElementById('modal-galeria');
        const modalImage = document.getElementById('modal-image');
        const modalTitle = document.getElementById('modal-titulo');
        const modalDescription = document.getElementById('modal-descricao');
        const closeModal = document.querySelector('.modal-fechar');
        
        // Seleciona todos os elementos que podem disparar o modal
        const triggers = document.querySelectorAll('.coluna-imagem-legenda.modal-trigger');

        const openModal = (trigger) => {
            const imageElement = trigger.querySelector('img');
            const titleElement = trigger.querySelector('.subtitulo-imagem');
            const descriptionElement = trigger.querySelector('.legenda-imagem');

            if (!imageElement || !modal) return;

            // Preenchimento e Lógica de Carregamento
            modalImage.src = ''; // Limpa a fonte antes de carregar
            modal.querySelector('.modal-imagem').classList.add('loading');
            
            modalImage.onload = () => {
                modal.querySelector('.modal-imagem').classList.remove('loading');
                modalImage.classList.add('loaded');
            };
            modalImage.onerror = () => {
                modal.querySelector('.modal-imagem').classList.remove('loading');
                modalDescription.textContent = "Erro ao carregar a imagem.";
            };

            modalImage.src = imageElement.src;
            modalImage.alt = imageElement.alt;
            
            modalTitle.textContent = titleElement ? titleElement.textContent.trim() : 'Sem Título';
            modalDescription.textContent = descriptionElement ? descriptionElement.textContent.trim() : '';

            modal.style.display = "flex";
            document.body.style.overflow = 'hidden'; // Bloqueia rolagem
        };

        const close = () => {
            if (!modal) return;
            modal.style.display = "none";
            document.body.style.overflow = '';
        };

        // Adiciona listeners
        triggers.forEach(trigger => {
            trigger.addEventListener('click', () => openModal(trigger));
        });

        if (closeModal) {
            closeModal.addEventListener('click', close);
        }

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                close();
            }
        });

        window.addEventListener('keydown', (event) => {
            if (event.key === "Escape" && modal && modal.style.display === "flex") {
                close();
            }
        });
    }

    // 3. EXECUÇÃO
    inicializarModalGaleria();
});