// Smooth scroll para los enlaces del menú
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

// Formulario de contacto
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        nombre: this.querySelector('input[type="text"]').value,
        email: this.querySelector('input[type="email"]').value,
        mensaje: this.querySelector('textarea').value
    };
    
    // Aquí normalmente enviarías los datos a un servidor
    console.log('Datos del formulario:', formData);
    
    alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
    this.reset();
});

// Efecto de scroll en el header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(44, 62, 80, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        header.style.background = '#2c3e50';
        header.style.boxShadow = 'none';
    }
});

// Animación para las cards de servicios
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animación a las cards
document.querySelectorAll('.servicio-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Animación SIN las líneas rojas
function animarHistoriaSimple() {
    const historiaImg = document.querySelector('.historia-imagen');
    const historiaText = document.querySelector('.historia-texto');
    
    if (historiaImg && historiaText) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Solo animación básica para imagen
                    historiaImg.style.opacity = '1';
                    historiaImg.style.transform = 'translateX(0)';
                    
                    // Animación simple para texto
                    const paragraphs = historiaText.querySelectorAll('p');
                    paragraphs.forEach((p, index) => {
                        setTimeout(() => {
                            p.style.opacity = '1';
                            p.style.transform = 'translateX(0)';
                        }, index * 150);
                    });
                }
            });
        }, { threshold: 0.2 });
        
        // Estilos iniciales simples
        historiaImg.style.opacity = '0';
        historiaImg.style.transform = 'translateX(-30px)';
        historiaImg.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        historiaText.querySelectorAll('p').forEach(p => {
            p.style.opacity = '0';
            p.style.transform = 'translateX(20px)';
            p.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        observer.observe(historiaImg);
    }
}