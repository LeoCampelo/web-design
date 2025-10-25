document.addEventListener('DOMContentLoaded', () => {

    // ================================================================
    // 1. ANIMAÇÕES SCROLLREVEAL (MANTIDO)
    // ================================================================
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({ distance: '40px', duration: 900, easing: 'ease-out', reset: false });

        // Animação do Banner Introdutório
        sr.reveal('.lazer-intro-banner h1', { origin: 'left' });
        sr.reveal('.lazer-intro-banner .lazer-subtitulo', { origin: 'left', delay: 100 });
        sr.reveal('#lazer-search-controls', { origin: 'top', delay: 200 });
        
        // Animação dos itens de lista
        sr.reveal('.lazer-topico', { origin: 'left', delay: 120, interval: 100 });
        sr.reveal('.lazer-item', { origin: 'bottom', interval: 100, viewFactor: 0.2 });
        
        // Faixa Extra e Rodapé
        sr.reveal('.faixa-extra', { origin: 'bottom', duration: 800, distance: '30px' });
        sr.reveal('.rodape', { origin: 'bottom', duration: 800, distance: '20px', delay: 100 });
    }

    // ================================================================
    // 2. FILTRO DE PESQUISA (CÓDIGO FUNCIONAL)
    // ================================================================
    (function addSearchAndControls() {
        const controlsHost = document.getElementById('lazer-search-controls');
        
        // --- HTML gerado ---
        controlsHost.innerHTML = `
            <label for="lazer-search" class="lazer-search-label">Pesquisar</label>
            <div class="lazer-input-group">
                <div class="lazer-search">
                    <input id="lazer-search" placeholder="Pesquisar local, tipo ou nome..." aria-label="Pesquisar locais de lazer">
                </div>
                <div class="lazer-search-actions">
                    <button id="lazer-clear" class="botao-pequeno" aria-label="Limpar pesquisa">Limpar</button>
                </div>
            </div>
        `;
        // --- FIM HTML gerado ---

        const input = controlsHost.querySelector('#lazer-search');
        const clearBtn = controlsHost.querySelector('#lazer-clear');

        function debounce(fn, wait = 220) {
            let t;
            return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); };
        }

        const itemsContainer = document.querySelector('main');
        const noResults = document.createElement('div');
        noResults.className = 'lazer-no-results';
        noResults.textContent = 'Nenhum resultado encontrado.';
        
        const allListItems = Array.from(document.querySelectorAll('.lazer-item'));

        function updateFilter() {
            const q = (input.value || '').trim().toLowerCase();
            let visible = 0;
            
            allListItems.forEach(item => {
                const text = (item.textContent || '').toLowerCase();
                const match = q === '' || text.includes(q);
                item.style.display = match ? '' : 'none';
                if (match) visible++;
            });
            
            if (visible === 0) {
                if (!document.body.contains(noResults)) {
                    document.querySelector('main').appendChild(noResults); 
                }
            } else {
                if (document.body.contains(noResults)) {
                    document.querySelector('main').removeChild(noResults);
                }
            }
        }

        const debouncedUpdate = debounce(updateFilter, 180);
        input.addEventListener('input', debouncedUpdate);
        clearBtn.addEventListener('click', () => { input.value = ''; input.focus(); updateFilter(); });
        
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') updateFilter();
        });

        document.querySelectorAll('.lazer-foto').forEach(img => {
            if (img.tagName === 'IMG') img.loading = 'lazy';
        });

    })();
    
    // ================================================================
    // 3. MODAL DE GALERIA AVANÇADO (CÓDIGO FUNCIONAL)
    // ================================================================
    const modal = document.getElementById('modal-galeria');
    const modalImg = document.getElementById('modal-image');
    const modalTitulo = document.getElementById('modal-titulo');
    const modalDescricao = document.getElementById('modal-descricao');
    const fechar = modal ? modal.querySelector('.modal-fechar') : null;
    const btnPrev = document.getElementById('modal-prev');
    const btnNext = document.getElementById('modal-next');

    const cards = Array.from(document.querySelectorAll('.lazer-item'));
    let currentIndex = -1;

    function openModal(index) {
        const card = cards[index];
        if (!card || !modal) return;

        const img = card.querySelector('.lazer-foto');
        const title = card.querySelector('h3') ? card.querySelector('h3').textContent : '';
        const desc = card.querySelector('p') ? card.querySelector('p').textContent : '';

        const src = img && img.tagName === 'IMG' ? img.src : '';
        
        const modalContainerImagem = modal.querySelector('.modal-imagem');
        if (modalContainerImagem) {
            modalContainerImagem.classList.add('loading');
            const existingImg = modalContainerImagem.querySelector('img');
            if (existingImg) existingImg.classList.remove('loaded');
        }
        modalImg.src = '';
        modalImg.alt = title;

        if (src) {
            const tmp = new Image();
            tmp.onload = () => {
                modalImg.src = src;
                if (modalContainerImagem) modalContainerImagem.classList.remove('loading');
                modalImg.classList.add('loaded');
            };
            tmp.onerror = () => {
                if (modalContainerImagem) modalContainerImagem.classList.remove('loading');
            };
            tmp.src = src;
        } else {
            if (modalContainerImagem) modalContainerImagem.classList.remove('loading');
        }
        modalTitulo.textContent = title;
        modalDescricao.textContent = desc;

        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');
        currentIndex = index;
        if (fechar) fechar.focus();
        trapFocus(modal);
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!modal) return;
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        currentIndex = -1;
        releaseFocusTrap();
        document.body.style.overflow = '';
    }

    function showNext() { openModal((currentIndex + 1) % cards.length); }
    function showPrev() { openModal((currentIndex - 1 + cards.length) % cards.length); }

    cards.forEach((card, idx) => {
        card.addEventListener('click', (e) => {
            card.classList.add('is-animating');
            setTimeout(() => card.classList.remove('is-animating'), 220);
            openModal(idx);
        });
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') openModal(idx);
        });
        card.setAttribute('tabindex', '0');
    });

    if (fechar) fechar.addEventListener('click', closeModal);
    if (btnPrev) btnPrev.addEventListener('click', showPrev);

    window.addEventListener('click', (ev) => { if (ev.target === modal) closeModal(); });
    document.addEventListener('keydown', (ev) => {
        if (!modal || modal.getAttribute('aria-hidden') === 'true') return;
        if (ev.key === 'Escape') closeModal();
        if (ev.key === 'ArrowRight') showNext();
        if (ev.key === 'ArrowLeft') showPrev();
    });

    // Focus trap helpers
    let lastFocused = null;
    let focusableElements = [];
    let firstFocusable = null;
    let lastFocusable = null;

    function trapFocus(container) {
        lastFocused = document.activeElement;
        focusableElements = Array.from(container.querySelectorAll('a, button, textarea, input, [tabindex]:not([tabindex="-1"])'))
            .filter(el => !el.hasAttribute('disabled'));
        firstFocusable = focusableElements[0];
        lastFocusable = focusableElements[focusableElements.length - 1];
        document.addEventListener('keydown', handleTrap);
        if (firstFocusable) firstFocusable.focus();
    }

    function handleTrap(e) {
        if (e.key !== 'Tab') return;
        if (e.shiftKey) { 
            if (document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            }
        }
    }

    function releaseFocusTrap() {
        document.removeEventListener('keydown', handleTrap);
        if (lastFocused) lastFocused.focus();
    }

});