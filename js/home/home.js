// js/home/home.js

document.addEventListener('DOMContentLoaded', () => {

    // ================================================================
    // 1. ANIMAÇÕES SCROLLREVEAL (MANTIDO)
    // ================================================================
    if (typeof ScrollReveal !== 'undefined') {
        
        const sr = ScrollReveal({
            distance: '50px', 
            duration: 1200, 
            easing: 'ease-out',
            reset: false 
        });

        // Animação da Home Page 
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
        
        sr.reveal('.turismo-header', { origin: 'top' });
        sr.reveal('.container-turismo-galeria .turismo-item', { 
            origin: 'bottom',
            interval: 200, 
            delay: 300 
        });
        
        sr.reveal('.rodape', { origin: 'bottom', duration: 800, distance: '20px', delay: 100 });
    }
    
    // ================================================================
    // 2. MODAL DE GALERIA (Pop-up de Imagem) - AGORA LÊ O SRC DA TAG <img>
    // ================================================================
    
    const modal = document.getElementById('modal-galeria');
    const fecharBtn = modal ? document.querySelector('.modal-fechar') : null;
    const modalContainerImagem = modal ? document.querySelector('.modal-imagem') : null; // Div container da imagem
    const modalImagem = modal ? document.getElementById('modal-image') : null; // A tag IMG dentro do modal
    const modalTitulo = modal ? document.getElementById('modal-titulo') : null;
    const modalDescricao = modal ? document.getElementById('modal-descricao') : null;
    
    // Seleciona todos os itens clicáveis que abrem o modal
    const itensGaleria = document.querySelectorAll('.lazer-item, .turismo-item, .historia-coluna-esquerda');

    // A. Adiciona o Listener de clique em todos os itens
    itensGaleria.forEach(item => {
        item.addEventListener('click', () => {
            let titulo, descricao, imagemElement;

            // 1. Lógica para extrair os dados dependendo do elemento clicado
            if (item.classList.contains('historia-coluna-esquerda')) {
                // Seção História
                titulo = item.querySelector('.historia-imagem-legenda h4').textContent;
                descricao = item.querySelector('.historia-imagem-legenda p').textContent;
                imagemElement = item.querySelector('.historia-imagem-placeholder');
            } else {
                // Galerias de Lazer ou Turismo
                titulo = item.querySelector('.item-titulo').textContent;
                descricao = item.querySelector('.item-info').textContent;
                imagemElement = item.querySelector('.item-imagem-placeholder');
            }
            
            const imageUrl = imagemElement ? imagemElement.src : '';
            const altText = imagemElement ? imagemElement.alt : 'Imagem';

            // 3. Preenche o conteúdo do modal
            if (modalImagem && modalTitulo && modalDescricao && modalContainerImagem) {
                
                // Adiciona a classe de loading
                modalContainerImagem.classList.add('loading');
                modalImagem.classList.remove('loaded');
                
                // Atualiza a imagem, garantindo o evento de 'load'
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

                // 4. Exibe o modal
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Bloqueia o scroll
            }
        });
    });

    // B. Lógica para fechar o modal
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

    // Nota: O código de Dark Mode e Voltar ao Topo é herdado do base.js
});