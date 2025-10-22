document.addEventListener('DOMContentLoaded', () => {
    // =====================
    // ScrollReveal (se disponível)
    // =====================
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({ distance: '40px', duration: 900, easing: 'ease-out', reset: false });
        sr.reveal('.lazer-conteudo h1, .lazer-conteudo .lazer-subtitulo', { origin: 'top', interval: 80 });
        sr.reveal('.lazer-item', { origin: 'bottom', interval: 120, viewFactor: 0.2 });
        sr.reveal('.lazer-topico', { origin: 'left', delay: 120 });
    }

    // =====================
    // Botão voltar ao topo
    // =====================
    const backToTop = document.getElementById('back-to-top') || document.getElementById('voltar-topo');
    if (backToTop) {
        const threshold = 300;
        window.addEventListener('scroll', () => {
            backToTop.style.display = window.scrollY > threshold ? 'block' : 'none';
        });
        backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // =====================
    // Mall – Filtro de pesquisa (adiciona input dinamicamente)
    // =====================
    (function addSearchAndControls() {
        const container = document.querySelector('.lazer-conteudo');
        if (!container) return;

        // Cria area de controles (input + botões)
        const controlsHost = document.getElementById('lazer-search-controls') || document.createElement('div');
        controlsHost.className = 'lazer-search-controls';

        controlsHost.innerHTML = `
            <div class="lazer-search">
                <label for="lazer-search" class="sr-only">Pesquisar</label>
                <input id="lazer-search" placeholder="Pesquisar local, tipo ou nome..." aria-label="Pesquisar locais de lazer">
            </div>
            <div class="lazer-search-actions">
                <button id="lazer-clear" class="botao-pequeno" aria-label="Limpar pesquisa">Limpar</button>
            </div>
        `;

        if (!document.getElementById('lazer-search-controls')) {
            container.insertBefore(controlsHost, container.querySelector('.lazer-topico'));
        } else {
            // se já existia, preenche
            document.getElementById('lazer-search-controls').replaceWith(controlsHost);
            controlsHost.id = 'lazer-search-controls';
        }

        const input = controlsHost.querySelector('#lazer-search');
    const clearBtn = controlsHost.querySelector('#lazer-clear');

        // Debounce helper
        function debounce(fn, wait = 220) {
            let t;
            return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); };
        }

        const itemsContainer = document.querySelector('.lazer-lista');
        const noResults = document.createElement('div');
        noResults.className = 'lazer-no-results';
        noResults.textContent = 'Nenhum resultado encontrado.';

        function updateFilter() {
            const q = (input.value || '').trim().toLowerCase();
            const items = Array.from(document.querySelectorAll('.lazer-item'));
            let visible = 0;
            items.forEach(item => {
                const text = (item.textContent || '').toLowerCase();
                const match = q === '' || text.includes(q);
                item.style.display = match ? '' : 'none';
                if (match) visible++;
            });
            if (visible === 0) {
                if (!itemsContainer.contains(noResults)) itemsContainer.appendChild(noResults);
            } else {
                if (itemsContainer.contains(noResults)) itemsContainer.removeChild(noResults);
            }
        }

        const debouncedUpdate = debounce(updateFilter, 180);
        input.addEventListener('input', debouncedUpdate);

        clearBtn.addEventListener('click', () => { input.value = ''; input.focus(); updateFilter(); });

        // Nota: botão de ordenação removido por solicitação — só mantém Limpar

        // Inicial: lazy-load nas imagens
        document.querySelectorAll('.lazer-foto').forEach(img => {
            if (img.tagName === 'IMG') img.loading = 'lazy';
        });

    })();

    // =====================
    // Modal de galeria com navegação por teclado
    // =====================
    const modal = document.getElementById('modal-galeria');
    const modalImg = document.getElementById('modal-image');
    const modalTitulo = document.getElementById('modal-titulo');
    const modalDescricao = document.getElementById('modal-descricao');
    const fechar = modal ? modal.querySelector('.modal-fechar') : null;
    const btnPrev = document.getElementById('modal-prev');
    const btnNext = document.getElementById('modal-next');

    // Coleção de cards que abrem modal
    const cards = Array.from(document.querySelectorAll('.lazer-item'));
    let currentIndex = -1;

    function openModal(index) {
        const card = cards[index];
        if (!card || !modal) return;

        const img = card.querySelector('.lazer-foto');
        const title = card.querySelector('h3') ? card.querySelector('h3').textContent : '';
        const desc = card.querySelector('p') ? card.querySelector('p').textContent : '';

        // Usa src da imagem ou background
        const src = img && img.tagName === 'IMG' ? img.src : '';
        // Adiciona classe de loading e remove loaded
        const modalContainerImagem = modal.querySelector('.modal-imagem');
        if (modalContainerImagem) {
            modalContainerImagem.classList.add('loading');
            const existingImg = modalContainerImagem.querySelector('img');
            if (existingImg) existingImg.classList.remove('loaded');
        }
        modalImg.src = '';
        modalImg.alt = title;

        // Preload da imagem para animar ao carregar
        if (src) {
            const tmp = new Image();
            tmp.onload = () => {
                modalImg.src = src;
                // animação: remove loading quando a imagem real for inserida
                setTimeout(() => {
                    if (modalContainerImagem) modalContainerImagem.classList.remove('loading');
                    modalImg.classList.add('loaded');
                }, 60);
            };
            tmp.onerror = () => {
                // falha no carregamento - remove spinner
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
        // foco para o fechar
        if (fechar) fechar.focus();
        // lock focus dentro do modal
        trapFocus(modal);
        // Bloqueia scroll no body para melhorar experiência mobile
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!modal) return;
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        currentIndex = -1;
        releaseFocusTrap();
        // Libera scroll do body
        document.body.style.overflow = '';
    }

    function showNext() { openModal((currentIndex + 1) % cards.length); }
    function showPrev() { openModal((currentIndex - 1 + cards.length) % cards.length); }

    cards.forEach((card, idx) => {
        card.addEventListener('click', (e) => {
            // micro-animação
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
    if (btnNext) btnNext.addEventListener('click', showNext);
    if (btnPrev) btnPrev.addEventListener('click', showPrev);

    window.addEventListener('click', (ev) => { if (ev.target === modal) closeModal(); });
    document.addEventListener('keydown', (ev) => {
        if (!modal || modal.getAttribute('aria-hidden') === 'true') return;
        if (ev.key === 'Escape') closeModal();
        if (ev.key === 'ArrowRight') showNext();
        if (ev.key === 'ArrowLeft') showPrev();
    });

    // =====================
    // Focus trap helpers
    // =====================
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
        if (!firstFocusable) { e.preventDefault(); return; }
        if (e.shiftKey) { // shift + tab
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
