// ============================================
// AUTO MOTION PARTS - MENÚ DESKTOP COMPLETO
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 AutoMotion Parts - Menú Desktop cargado');
    
    // ============================================
    // 1. CONFIGURACIÓN INICIAL
    // ============================================
    const navLinks = document.querySelector('.nav-links');
    const hasSubmenuItems = document.querySelectorAll('.has-submenu');
    const allNavLinks = document.querySelectorAll('.nav-links a');
    
    // ============================================
    // 2. RESALTAR PÁGINA ACTIVA
    // ============================================
    function highlightActivePage() {
        // Obtener la página actual
        const currentPath = window.location.pathname;
        const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
        
        // Remover clase 'active' de todos los enlaces
        allNavLinks.forEach(link => {
            link.classList.remove('active');
            link.classList.remove('active-submenu');
        });
        
        // Buscar y resaltar el enlace correspondiente
        allNavLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            
            // Caso 1: Enlace exacto
            if (linkHref === currentPage) {
                link.classList.add('active');
                
                // Si está en submenú, también resaltar el padre
                const parentSubmenu = link.closest('.has-submenu');
                if (parentSubmenu) {
                    const parentLink = parentSubmenu.querySelector('> a');
                    if (parentLink) {
                        parentLink.classList.add('active-submenu');
                    }
                }
            }
            
            // Caso 2: Para index.html cuando es la raíz
            if (currentPage === '' && linkHref === 'index.html') {
                link.classList.add('active');
            }
            
            // Caso 3: Para páginas con nombres similares
            if (currentPage.includes(linkHref.replace('.html', '')) && 
                linkHref !== 'index.html' && 
                currentPage !== 'index.html') {
                link.classList.add('active');
            }
        });
        
        console.log('📍 Página activa resaltada:', currentPage);
    }
    
    // ============================================
    // 3. EFECTOS DE HOVER MEJORADOS
    // ============================================
    function initHoverEffects() {
        hasSubmenuItems.forEach(item => {
            const submenu = item.querySelector('.submenu');
            const mainLink = item.querySelector('> a');
            let closeTimeout;
            let openTimeout;
            
            // Al entrar al item principal
            item.addEventListener('mouseenter', function() {
                clearTimeout(closeTimeout);
                clearTimeout(openTimeout);
                
                openTimeout = setTimeout(() => {
                    // Añadir clase para animación
                    this.classList.add('submenu-open');
                    
                    // Efecto en la flecha
                    const chevron = mainLink.querySelector('.fa-chevron-down');
                    if (chevron) {
                        chevron.style.transform = 'rotate(180deg)';
                        chevron.style.transition = 'transform 0.3s ease';
                    }
                    
                    // Efecto de escalado suave
                    if (submenu) {
                        submenu.style.opacity = '0';
                        submenu.style.transform = 'translateY(-10px) scale(0.95)';
                        submenu.style.display = 'block';
                        
                        setTimeout(() => {
                            submenu.style.opacity = '1';
                            submenu.style.transform = 'translateY(0) scale(1)';
                            submenu.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        }, 10);
                    }
                }, 50); // Pequeño delay para mejor UX
            });
            
            // Al salir del item principal
            item.addEventListener('mouseleave', function() {
                clearTimeout(openTimeout);
                
                closeTimeout = setTimeout(() => {
                    this.classList.remove('submenu-open');
                    
                    // Restaurar flecha
                    const chevron = mainLink.querySelector('.fa-chevron-down');
                    if (chevron) {
                        chevron.style.transform = 'rotate(0deg)';
                    }
                    
                    // Animación de salida
                    if (submenu) {
                        submenu.style.opacity = '0';
                        submenu.style.transform = 'translateY(-10px) scale(0.95)';
                        
                        setTimeout(() => {
                            submenu.style.display = 'none';
                        }, 300);
                    }
                }, 150); // Delay antes de cerrar
            });
            
            // Prevenir cierre al pasar al submenú
            submenu?.addEventListener('mouseenter', () => {
                clearTimeout(closeTimeout);
            });
            
            submenu?.addEventListener('mouseleave', () => {
                closeTimeout = setTimeout(() => {
                    item.classList.remove('submenu-open');
                    const chevron = mainLink.querySelector('.fa-chevron-down');
                    if (chevron) {
                        chevron.style.transform = 'rotate(0deg)';
                    }
                    
                    if (submenu) {
                        submenu.style.opacity = '0';
                        submenu.style.transform = 'translateY(-10px) scale(0.95)';
                        
                        setTimeout(() => {
                            submenu.style.display = 'none';
                        }, 300);
                    }
                }, 100);
            });
        });
        
        // Efecto hover en todos los enlaces
        allNavLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.transition = 'transform 0.2s ease';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
    
    // ============================================
    // 4. SCROLL EFFECTS PARA HEADER
    // ============================================
    function initScrollEffects() {
        const header = document.querySelector('header');
        let lastScroll = 0;
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            // Efecto de sombra al hacer scroll
            if (currentScroll > 50) {
                header.style.background = 'rgba(26, 54, 93, 0.98)';
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
                header.style.backdropFilter = 'blur(15px)';
            } else {
                header.style.background = 'rgba(26, 54, 93, 0.95)';
                header.style.boxShadow = 'none';
                header.style.backdropFilter = 'blur(10px)';
            }
            
            // Ocultar submenús al hacer scroll
            if (Math.abs(currentScroll - lastScroll) > 10) {
                document.querySelectorAll('.has-submenu.submenu-open').forEach(item => {
                    item.classList.remove('submenu-open');
                    const submenu = item.querySelector('.submenu');
                    const chevron = item.querySelector('.fa-chevron-down');
                    
                    if (submenu) {
                        submenu.style.display = 'none';
                    }
                    
                    if (chevron) {
                        chevron.style.transform = 'rotate(0deg)';
                    }
                });
            }
            
            lastScroll = currentScroll;
        });
    }
    
    // ============================================
    // 5. SMOOTH SCROLL PARA ANCLAS
    // ============================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Solo procesar anclas internas (no enlaces a otras páginas)
                if (href === '#' || href.startsWith('#contacto')) {
                    e.preventDefault();
                    
                    const targetId = href === '#' ? 'inicio' : href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        // Cerrar cualquier submenú abierto
                        document.querySelectorAll('.has-submenu.submenu-open').forEach(item => {
                            item.classList.remove('submenu-open');
                            const submenu = item.querySelector('.submenu');
                            if (submenu) submenu.style.display = 'none';
                        });
                        
                        // Scroll suave
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                        
                        // Resaltar temporalmente el elemento
                        targetElement.style.boxShadow = '0 0 0 3px rgba(229, 62, 62, 0.3)';
                        setTimeout(() => {
                            targetElement.style.boxShadow = '';
                        }, 1500);
                    }
                }
            });
        });
    }
    
    // ============================================
    // 6. CLICK OUTSIDE PARA CERRAR SUBMENÚS
    // ============================================
    function initClickOutside() {
        document.addEventListener('click', function(e) {
            const isClickInsideMenu = navLinks.contains(e.target);
            
            if (!isClickInsideMenu) {
                // Cerrar todos los submenús
                document.querySelectorAll('.has-submenu.submenu-open').forEach(item => {
                    item.classList.remove('submenu-open');
                    const submenu = item.querySelector('.submenu');
                    const chevron = item.querySelector('.fa-chevron-down');
                    
                    if (submenu) {
                        submenu.style.display = 'none';
                    }
                    
                    if (chevron) {
                        chevron.style.transform = 'rotate(0deg)';
                    }
                });
            }
        });
    }
    
    // ============================================
    // 7. KEYBOARD NAVIGATION
    // ============================================
    function initKeyboardNav() {
        document.addEventListener('keydown', function(e) {
            // Cerrar con Escape
            if (e.key === 'Escape') {
                document.querySelectorAll('.has-submenu.submenu-open').forEach(item => {
                    item.classList.remove('submenu-open');
                    const submenu = item.querySelector('.submenu');
                    if (submenu) submenu.style.display = 'none';
                });
            }
            
            // Navegación con Tab
            if (e.key === 'Tab') {
                const activeElement = document.activeElement;
                const isNavLink = Array.from(allNavLinks).includes(activeElement);
                
                if (isNavLink && activeElement.parentElement.classList.contains('has-submenu')) {
                    // Abrir submenú al enfocar con Tab
                    activeElement.parentElement.classList.add('submenu-open');
                    const submenu = activeElement.parentElement.querySelector('.submenu');
                    if (submenu) submenu.style.display = 'block';
                }
            }
        });
    }
    
    // ============================================
    // 8. INICIALIZACIÓN COMPLETA
    // ============================================
    function initDesktopMenu() {
        // Solo ejecutar en desktop
        if (window.innerWidth < 992) return;
        
        highlightActivePage();
        initHoverEffects();
        initScrollEffects();
        initSmoothScroll();
        initClickOutside();
        initKeyboardNav();
        
        console.log('✅ Menú desktop inicializado correctamente');
    }
    
    // ============================================
    // 9. EVENTOS Y LISTENERS
    // ============================================
    
    // Inicializar al cargar
    initDesktopMenu();
    
    // Re-inicializar si cambia el tamaño (por si acaso)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            initDesktopMenu();
        }
    });
    
    // Actualizar página activa al navegar (si usas SPA)
    window.addEventListener('popstate', highlightActivePage);
    
    // ============================================
    // 10. CSS DINÁMICO PARA EFECTOS EXTRA
    // ============================================
    const dynamicStyles = `
        /* Efecto de línea inferior para enlaces activos */
        .nav-links > li > a.active::after {
            width: 80% !important;
            background: var(--accent-red) !important;
        }
        
        /* Submenú abierto */
        .has-submenu.submenu-open > a {
            color: var(--accent-red) !important;
            background: rgba(255, 255, 255, 0.15) !important;
        }
        
        /* Animación para submenú */
        .has-submenu .submenu {
            animation: slideDown 0.3s ease !important;
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-15px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        /* Efecto de pulso para enlaces activos */
        @keyframes pulse-glow {
            0% { box-shadow: 0 0 0 0 rgba(229, 62, 62, 0.4); }
            70% { box-shadow: 0 0 0 6px rgba(229, 62, 62, 0); }
            100% { box-shadow: 0 0 0 0 rgba(229, 62, 62, 0); }
        }
        
        .nav-links > li > a.active {
            animation: pulse-glow 2s infinite;
        }
    `;
    
    // Inyectar estilos dinámicos
    const styleSheet = document.createElement('style');
    styleSheet.textContent = dynamicStyles;
    document.head.appendChild(styleSheet);
    
    console.log('🎨 Estilos dinámicos inyectados');
});

// ============================================
// FUNCIONES GLOBALES (opcional)
// ============================================
function closeAllSubmenus() {
    document.querySelectorAll('.has-submenu.submenu-open').forEach(item => {
        item.classList.remove('submenu-open');
        const submenu = item.querySelector('.submenu');
        if (submenu) submenu.style.display = 'none';
    });
}

function openSubmenu(submenuId) {
    const submenuItem = document.querySelector(`[data-submenu="${submenuId}"]`);
    if (submenuItem) {
        closeAllSubmenus();
        submenuItem.classList.add('submenu-open');
        const submenu = submenuItem.querySelector('.submenu');
        if (submenu) submenu.style.display = 'block';
    }
}