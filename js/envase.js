// Animaciones para la página de envase - VERSIÓN MEJORADA
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

    // Animaciones al hacer scroll - MEJORADAS
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animación escalonada para los items
                if (entry.target.classList.contains('material-item')) {
                    const delay = Array.from(document.querySelectorAll('.material-item')).indexOf(entry.target) * 100;
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, delay);
                }
                
                // Animación para las cards de productos
                if (entry.target.classList.contains('producto-envase-card')) {
                    const delay = Array.from(document.querySelectorAll('.producto-envase-card')).indexOf(entry.target) * 200;
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, delay);
                }
            }
        });
    }, observerOptions);

    // Aplicar animaciones a todos los elementos
    const elementsToAnimate = [
        '.producto-envase-card',
        '.material-item',
        '.justificacion-item',
        '.envase-img',
        '.tabla-img',
        '.justificacion-img'
    ];

    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    });

    // Efecto parallax para el hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.envase-hero');
        const rate = scrolled * 0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Animación para los íconos al hacer hover
    document.querySelectorAll('.material-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.material-icono');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.material-icono');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Animación para las cards de justificación
    document.querySelectorAll('.justificacion-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.justificacion-icono');
            if (icon) {
                icon.style.transform = 'scale(1.15) rotate(5deg)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.justificacion-icono');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Efecto de carga progresiva para imágenes
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                img.style.transform = 'scale(1)';
                
                // Precargar imágenes para mejor performance
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
            }
        });
    }, observerOptions);

    // Aplicar a todas las imágenes
    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });

    // Contador animado para estadísticas (si agregas alguna)
    function initCounters() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }

    // Iniciar contadores cuando sean visibles
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                initCounters();
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar sección de estadísticas si existe
    const statsSection = document.querySelector('.estadisticas');
    if (statsSection) {
        counterObserver.observe(statsSection);
    }

    // Efecto de escritura para títulos (opcional)
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Aplicar efecto de escritura al hero (opcional)
    const heroTitle = document.querySelector('.envase-hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        // typeWriter(heroTitle, originalText);
    }

    console.log('🚀 AutoMotion Parts - Envase cargado con animaciones mejoradas');
});

// Función para manejar el formulario de contacto (si lo agregas)
function handleContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                nombre: this.querySelector('input[name="nombre"]').value,
                email: this.querySelector('input[name="email"]').value,
                mensaje: this.querySelector('textarea[name="mensaje"]').value
            };
            
            // Simular envío
            console.log('📧 Formulario de contacto enviado:', formData);
            
            // Mostrar mensaje de éxito
            alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
            this.reset();
        });
    }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handleContactForm);
} else {
    handleContactForm();
}

// Efectos adicionales para interactividad
document.addEventListener('click', function(e) {
    // Efecto ripple en botones
    if (e.target.classList.contains('btn') || e.target.classList.contains('cta-button')) {
        const btn = e.target;
        const ripple = document.createElement('span');
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        btn.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// CSS para efecto ripple (agrégalo a tu CSS)
const rippleStyles = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.btn, .cta-button {
    position: relative;
    overflow: hidden;
}
`;

// Inyectar estilos ripple
const styleSheet = document.createElement('style');
styleSheet.textContent = rippleStyles;
document.head.appendChild(styleSheet);