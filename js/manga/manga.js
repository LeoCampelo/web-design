/**
 * ========================================
 * MANGA.JS - Interações da Página do Prefeito
 * * Funcionalidades:
 * 1. Cursor personalizado em forma de manga (🥭)
 * 2. Explosão de mangas ao clicar na página
 * 3. Animação de fade-in nas seções ao rolar (ScrollReveal)
 * 4. Modal de Imagens (Corrigido)
 * ========================================
 */

document.addEventListener('DOMContentLoaded', () => {
    const reduceMotion = (() => { try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch { return false; } })();
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // --- FUNCIONALIDADE 1 & 2: CURSOR E EXPLOSÃO DE MANGAS ---
    if (!reduceMotion && !isTouch) {
        const cursor = document.createElement('div');
        cursor.textContent = '🥭';
        Object.assign(cursor.style, {
            position: 'fixed',
            pointerEvents: 'none',
            zIndex: 10000,
            fontSize: '22px',
            transform: 'translate(-50%,-50%)',
            transition: 'transform .12s ease, opacity .12s',
            willChange: 'transform, opacity'
        });
        document.body.appendChild(cursor);

        const hideNative = () => { document.documentElement.style.cursor = 'none'; cursor.style.opacity = '1'; };
        const showNative = () => { document.documentElement.style.cursor = ''; cursor.style.opacity = '0'; };
        hideNative();

        document.addEventListener('mousemove', e => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        }, { passive: true });

        const interactiveSelector = 'a, button, input, textarea, select, [role="button"], [tabindex]';
        document.querySelectorAll(interactiveSelector).forEach(el => {
            el.addEventListener('mouseenter', showNative, { passive: true });
            el.addEventListener('mouseleave', hideNative, { passive: true });
            el.addEventListener('focus', showNative);
            el.addEventListener('blur', hideNative);
        });

        const mo = new MutationObserver(muts => {
            muts.forEach(m => {
                m.addedNodes.forEach(node => {
                    if (!(node instanceof Element)) return;
                    if (node.matches && node.matches(interactiveSelector)) {
                        node.addEventListener('mouseenter', showNative, { passive: true });
                        node.addEventListener('mouseleave', hideNative, { passive: true });
                        node.addEventListener('focus', showNative);
                        node.addEventListener('blur', hideNative);
                    }
                    node.querySelectorAll && node.querySelectorAll(interactiveSelector).forEach(child => {
                        child.addEventListener('mouseenter', showNative, { passive: true });
                        child.addEventListener('mouseleave', hideNative, { passive: true });
                        child.addEventListener('focus', showNative);
                        child.addEventListener('blur', hideNative);
                    });
                });
            });
        });
        mo.observe(document.body, { childList: true, subtree: true });

        window.addEventListener('beforeunload', () => { document.documentElement.style.cursor = ''; });

        // Explosão de mangas ao clicar
        document.addEventListener('click', (e) => {
            const count = 8;
            for (let i = 0; i < count; i++) {
                const el = document.createElement('div');
                el.textContent = '🥭';
                Object.assign(el.style, {
                    position: 'fixed', left: e.clientX + 'px', top: e.clientY + 'px',
                    pointerEvents: 'none', zIndex: 9999, fontSize: '16px',
                    transition: 'transform .85s cubic-bezier(.22,.9,.32,1), opacity .85s'
                });
                document.body.appendChild(el);
                const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
                const distance = 60 + Math.random() * 80;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
                requestAnimationFrame(() => {
                    el.style.transform = `translate(${x}px, ${y}px) rotate(${Math.random() * 360}deg)`;
                    el.style.opacity = '0';
                });
                setTimeout(() => el.remove(), 900);
            }
        });
    }

    // --- FUNCIONALIDADE 3: ANIMAÇÃO SCROLLREVEAL ---
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({ distance: '50px', duration: 1200, easing: 'ease-out', reset: false });

        // Banner Introdutório
        sr.reveal('.manga-intro-banner .hero-title', { origin: 'left' });
        sr.reveal('.manga-intro-banner .hero-description', { origin: 'left', delay: 200 });
        
        // Animação Alternada para as Seções (Conteúdo e Imagem)
        document.querySelectorAll('.content-section').forEach((section, index) => {
            const isReversed = section.classList.contains('reverse');

            sr.reveal(section.querySelector('.section-title'), { origin: 'top' });
            sr.reveal(section.querySelector('.text-content'), { 
                origin: isReversed ? 'right' : 'left', 
                delay: 200 
            });

            sr.reveal(section.querySelector('.image-container'), { 
                origin: isReversed ? 'left' : 'right', 
                delay: 200 
            });
        });
        
        // Animação do Footer
        sr.reveal('.rodape', { origin: 'bottom', duration: 800, distance: '20px', delay: 100 });
    }
});