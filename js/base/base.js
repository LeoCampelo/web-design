document.addEventListener('DOMContentLoaded', () => {

    // ================================================================
    // 1. FUNCIONALIDADE: TELA DE CARREGAMENTO (Loading Screen)
    // ================================================================
    const loader = document.getElementById('page-loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300); 
    }
    
    // ================================================================
    // 2. FUNCIONALIDADE: MODO LIGHT/DARK (Existente)
    // ================================================================

    const toggleButton = document.getElementById('toggle-dark-mode');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;
    const localStorageKey = 'sorocabaTheme';

    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            themeIcon.textContent = '☀️'; 
            localStorage.setItem(localStorageKey, 'dark');
        } else {
            body.classList.remove('dark-mode');
            themeIcon.textContent = '🌙'; 
            localStorage.setItem(localStorageKey, 'light');
        }
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem(localStorageKey);

    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (prefersDark) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }

    if (toggleButton) {
        toggleButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            applyTheme(newTheme);
        });
    }


    // ================================================================
    // 3. FUNCIONALIDADE: FOCO VISÍVEL PARA ACESSIBILIDADE (Novo)
    // ================================================================
    (function enableKeyboardFocus() {
        let hadKeyboardEvent = false;

        function handleKeyDown() {
            hadKeyboardEvent = true;
        }

        function handleMouseDown() {
            hadKeyboardEvent = false;
        }

        function handleFocus(e) {
            if (hadKeyboardEvent) {
                e.target.classList.add('keyboard-focus');
            }
        }

        function handleBlur(e) {
            e.target.classList.remove('keyboard-focus');
        }

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('focus', handleFocus, true); 
        document.addEventListener('blur', handleBlur, true); 
    })();


    // ================================================================
    // 4. FUNCIONALIDADE: BOTÃO DE VOLTAR AO TOPO (Existente)
    // ================================================================
    const backToTopButton = document.getElementById('back-to-top');
    const scrollThreshold = 400; 

    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > scrollThreshold) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' 
            });
        });
    }

    // ================================================================
    // 5. FUNCIONALIDADE: MENU DE NAVEGAÇÃO RESPONSIVO (Existente)
    // ================================================================
    const menuIcone = document.getElementById('toggle-menu-mobile');
    const menuLinks = document.querySelector('.menu-principal-links');
    
    if (menuIcone && menuLinks) {
        
        const fecharMenuAoClicar = () => {
            if (menuLinks.classList.contains('menu-aberto')) {
                menuLinks.classList.remove('menu-aberto');
                menuIcone.classList.remove('is-active');
            }
        };

        menuIcone.addEventListener('click', (e) => {
            e.preventDefault();
        
            menuLinks.classList.toggle('menu-aberto');
            menuIcone.classList.toggle('is-active');
            
            const links = menuLinks.querySelectorAll('a');
            links.forEach(link => {
                link.addEventListener('click', fecharMenuAoClicar, { once: true });
            });
        });
    }

});