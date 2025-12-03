// SERVICIO - JavaScript con animaciones chingonas
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 AutoMotion Parts - Servicio al Cliente cargado');
    
    // Smooth scroll para navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Efecto de scroll en el header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(26, 54, 93, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'rgba(26, 54, 93, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
    
    // Animaciones al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animación especial para tarjetas de política
                if (entry.target.classList.contains('politica-card')) {
                    const delay = Array.from(document.querySelectorAll('.politica-card')).indexOf(entry.target) * 200;
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, delay);
                }
                
                // Animación para estrategias
                if (entry.target.classList.contains('estrategia-card')) {
                    const delay = Array.from(document.querySelectorAll('.estrategia-card')).indexOf(entry.target) * 100;
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, delay);
                }
                
                // Animación para filas de tabla
                if (entry.target.classList.contains('tabla-indicadores')) {
                    const rows = entry.target.querySelectorAll('tbody tr');
                    rows.forEach((row, index) => {
                        setTimeout(() => {
                            row.style.opacity = '1';
                            row.style.transform = 'translateX(0)';
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Aplicar animaciones a elementos
    const elementosParaAnimar = [
        '.objetivo-content',
        '.politica-card',
        '.estrategia-card',
        '.tabla-indicadores',
        '.tiempo-item',
        '.politica-item'
    ];
    
    elementosParaAnimar.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    });
    
    // Animación para filas de tabla
    const tabla = document.querySelector('.tabla-indicadores');
    if (tabla) {
        const rows = tabla.querySelectorAll('tbody tr');
        rows.forEach(row => {
            row.style.opacity = '0';
            row.style.transform = 'translateX(-20px)';
            row.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        observer.observe(tabla);
    }
    
    // Efecto parallax para el hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.servicio-hero');
        const rate = scrolled * 0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Efectos hover mejorados para tarjetas
    document.querySelectorAll('.politica-card, .estrategia-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.politica-icono, .estrategia-icono');
            if (icon) {
                icon.style.transform = 'scale(1.15) rotate(8deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.politica-icono, .estrategia-icono');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // Animación para los tiempos de respuesta
    document.querySelectorAll('.tiempo-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            const numero = this.querySelector('.numero');
            if (numero) {
                numero.style.transform = 'scale(1.2)';
                numero.style.color = 'var(--accent-red)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const numero = this.querySelector('.numero');
            if (numero) {
                numero.style.transform = 'scale(1)';
                numero.style.color = '';
            }
        });
    });
    
    // Efecto de conteo para los números de tiempo (opcional)
    function animarContadores() {
        const contadores = document.querySelectorAll('.tiempo-valor');
        contadores.forEach(contador => {
            const numeroElement = contador.querySelector('.numero');
            const numeroTexto = numeroElement.textContent;
            const numero = parseInt(numeroTexto);
            
            if (!isNaN(numero)) {
                let contadorActual = 0;
                const incremento = numero / 20;
                const intervalo = setInterval(() => {
                    contadorActual += incremento;
                    if (contadorActual >= numero) {
                        contadorActual = numero;
                        clearInterval(intervalo);
                    }
                    numeroElement.textContent = Math.floor(contadorActual);
                }, 50);
            }
        });
    }
    
    // Observar sección de tiempos
    const tiempoObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animarContadores();
                tiempoObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const tiemposSection = document.querySelector('.politica-servicio');
    if (tiemposSection) {
        tiempoObserver.observe(tiemposSection);
    }
    
    // Funcionalidad para botones CTA
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('primario')) {
                alert('🏭 Serás redirigido a nuestro formulario de cotización. ¡Gracias por tu interés en AutoMotion Parts!');
                // window.location.href = 'index.html#contacto';
            } else if (this.classList.contains('secundario')) {
                alert('📞 Nuestro equipo de servicio al cliente se pondrá en contacto contigo en breve.');
                // window.location.href = 'index.html#contacto';
            }
            
            // Efecto de clic
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Efecto ripple en botones
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.width = ripple.style.height = '100px';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Inyectar animación ripple en CSS
    const rippleStyles = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = rippleStyles;
    document.head.appendChild(styleSheet);
    
    // Preload de imágenes para mejor performance
    function preloadImages() {
        const images = [
            'img/servicio-fondo.jpg',
            'img/logo.jpg'
        ];
        
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    
    preloadImages();
    
    // Inicialización completa
    console.log('✅ Todas las animaciones de servicio están listas');
});