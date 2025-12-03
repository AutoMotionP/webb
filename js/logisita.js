// Animaciones para la página de logística
document.addEventListener('DOMContentLoaded', function() {
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

    // Animaciones al hacer scroll para el diagrama de carretera
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animación escalonada para las etapas
                if (entry.target.classList.contains('etapa')) {
                    const delay = Array.from(document.querySelectorAll('.etapa')).indexOf(entry.target) * 200;
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, delay);
                }
            }
        });
    }, observerOptions);

    // Aplicar animaciones
    const elementsToAnimate = [
        '.etapa',
        '.flujo-categoria',
        '.participante-card-sim',
        '.info-item',
        '.detalle-item'
    ];

    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    });

    // Efecto parallax para la carretera
    window.addEventListener('scroll', function() {
        const carretera = document.querySelector('.carretera-linea');
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (carretera) {
            carretera.style.transform = `translateY(-50%) translateX(${rate}px)`;
        }
    });
});