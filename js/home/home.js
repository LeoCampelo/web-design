document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------
    // 3. ANIMAÇÕES SCROLLREVEAL (NOVA FUNCIONALIDADE)
    // ----------------------------------------------------------------
    if (typeof ScrollReveal !== 'undefined') {
        
        const sr = ScrollReveal({
            distance: '50px', 
            duration: 1200,    
            easing: 'ease-out',
            reset: false       
        });

        sr.reveal('.lazer-intro', { origin: 'left' });
        sr.reveal('.lazer-galeria .lazer-item', { 
            origin: 'bottom',
            interval: 250, 
            delay: 300     
        });

        sr.reveal('.historia-imagem', { origin: 'left', delay: 200 });
        sr.reveal('.historia-intro', { origin: 'right', delay: 200 });
        sr.reveal('.turismo-header', { origin: 'top' });
        sr.reveal('.container-turismo-galeria .turismo-item', { 
            origin: 'bottom',
            interval: 200, 
            delay: 300 
        });
        
    }

    // ================================================================
    // 2. MODAL DE GALERIA (Pop-up de Imagem) - REVISADO PARA HISTÓRIA
    // ================================================================
    const modal = document.getElementById('modal-galeria');
    const fecharBtn = document.querySelector('.modal-fechar');
    const modalImagem = document.getElementById('modal-imagem');
    const modalTitulo = document.getElementById('modal-titulo');
    const modalDescricao = document.getElementById('modal-descricao');
    
    // Seleciona todos os itens que podem abrir o modal (ADICIONADO .historia-coluna-esquerda)
    const itensGaleria = document.querySelectorAll('.lazer-item, .turismo-item, .historia-coluna-esquerda');

    // Função auxiliar para extrair a URL de background-image (necessário devido ao CSS)
    function getBackgroundImageUrl(element) {
        const style = window.getComputedStyle(element);
        const url = style.backgroundImage;
        return url.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
    }

    // A. Adiciona o Listener de clique em todos os itens
    itensGaleria.forEach(item => {
        item.addEventListener('click', () => {
            let titulo, descricao, imagemDiv;

            // 1. Lógica para extrair os dados dependendo do elemento clicado
            if (item.classList.contains('historia-coluna-esquerda')) {
                // Se for a seção História, busca os elementos dentro da estrutura dela
                titulo = item.querySelector('.historia-imagem-legenda h4').textContent;
                descricao = item.querySelector('.historia-imagem-legenda p').textContent;
                imagemDiv = item.querySelector('.historia-imagem');
            } else {
                // Se for as galerias de Lazer ou Turismo, usa a estrutura padrão
                titulo = item.querySelector('.item-titulo').textContent;
                descricao = item.querySelector('.item-info').textContent;
                imagemDiv = item.querySelector('.item-imagem');
            }
            
            // 2. Obtém a URL da imagem de fundo
            const imageUrl = getBackgroundImageUrl(imagemDiv);

            // 3. Preenche o conteúdo do modal
            modalImagem.style.backgroundImage = `url('${imageUrl}')`;
            modalTitulo.textContent = titulo;
            modalDescricao.textContent = descricao;

            // 4. Exibe o modal
            modal.style.display = 'flex';
        });
    });

    // B. Lógica para fechar o modal
    // 1. Ao clicar no 'X'
    fecharBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // 2. Ao clicar fora do modal (na área escura)
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // 3. Ao pressionar a tecla ESC
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            modal.style.display = 'none';
        }
    });
});