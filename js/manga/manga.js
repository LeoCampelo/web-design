/**
 * ========================================
 * MANGA.JS
 * Arquivo de interações JavaScript para a página
 * 
 * Funcionalidades:
 * 1. Cursor personalizado em forma de manga (🥭)
 * 2. Explosão de mangas ao clicar na página
 * 3. Animação de fade-in nas seções ao rolar
 * 4. Scroll suave para links de navegação
 * ========================================
 */

/* Interações da página de manga — cursor em forma de manga + interações limpas */

document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = (() => { try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch { return false; } })();
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Cursor emoji (desativa em touch / reduced-motion)
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

    // Esconde o cursor nativo do documento
    const hideNative = () => { document.documentElement.style.cursor = 'none'; cursor.style.opacity = '1'; };
    const showNative = () => { document.documentElement.style.cursor = ''; cursor.style.opacity = '0'; };

    // Inicialmente esconde o cursor nativo
    hideNative();

    // Move o cursor customizado
    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    }, { passive: true });

    // Mostra cursor nativo quando sobre controles interativos
    const interactiveSelector = 'a, button, input, textarea, select, [role="button"], [tabindex]';
    const interactiveEls = Array.from(document.querySelectorAll(interactiveSelector));
    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', showNative, { passive: true });
      el.addEventListener('mouseleave', hideNative, { passive: true });
      el.addEventListener('focus', showNative);
      el.addEventListener('blur', hideNative);
    });

    // Se elementos interativos forem adicionados dinamicamente, observe o DOM
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

    // Restaurar cursor nativo ao sair da página
    window.addEventListener('beforeunload', () => { document.documentElement.style.cursor = ''; });

    // pequenas vibrações visuais ao clicar (explosão de mangas)
    document.addEventListener('click', (e) => {
      const count = 8;
      for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        el.textContent = '🥭';
        Object.assign(el.style, {
          position: 'fixed',
          left: e.clientX + 'px',
          top: e.clientY + 'px',
          pointerEvents: 'none',
          zIndex: 9999,
          fontSize: '16px',
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

  // IntersectionObserver para animação de seções (permanece igual)
  const sections = document.querySelectorAll('.content-section');
  if (sections.length) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('visible'); obs.unobserve(en.target); } });
    }, { threshold: 0.12 });
    sections.forEach(s => io.observe(s));
  }

  // Lazy classes para imagens
  const imgs = document.querySelectorAll('.image-container img');
  if (imgs.length) {
    const imgIo = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) en.target.classList.add('inview'); });
    }, { threshold: 0.2 });
    imgs.forEach(i => imgIo.observe(i));
  }

  // Smooth scroll para âncoras internas
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href && href !== '#') {
        const target = document.querySelector(href);
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      }
    });
  });

  // Destaque de seção ativa (simples)
  const navLinks = document.querySelectorAll('.menu-principal-links a[href^="#"]');
  function highlight() {
    let current = '';
    sections.forEach(s => { if (window.pageYOffset >= s.offsetTop - 120) current = s.id || current; });
    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
  }
  window.addEventListener('scroll', highlight);
  highlight();
});