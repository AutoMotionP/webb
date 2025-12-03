// ============================================
// CUBICAJE - JAVASCRIPT INTERACTIVO
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('📦 Cubicaje - JavaScript cargado');
    
    // ============================================
    // 1. LIGHTBOX PARA IMÁGENES
    // ============================================
    
    function initLightbox() {
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = lightbox.querySelector('.lightbox-image');
        const lightboxTitle = lightbox.querySelector('.lightbox-title');
        const lightboxDesc = lightbox.querySelector('.lightbox-desc');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');
        
        // Obtener todas las imágenes que abren lightbox
        const openButtons = document.querySelectorAll('.ver-detalle, .imagen-overlay');
        const allImages = [];
        
        // Configurar cada botón
        openButtons.forEach((btn, index) => {
            const imageContainer = btn.closest('.subtema-imagen, .visualizacion-imagen');
            if (imageContainer) {
                const img = imageContainer.querySelector('img');
                const title = imageContainer.closest('.subtema-card, .visualizacion-card')
                    ?.querySelector('h3')?.textContent || 'Imagen';
                const desc = imageContainer.closest('.subtema-card, .visualizacion-card')
                    ?.querySelector('p')?.textContent || 'Detalle del cubicaje';
                
                if (img) {
                    allImages.push({
                        src: img.src,
                        alt: img.alt,
                        title: title,
                        desc: desc
                    });
                    
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openLightbox(index);
                    });
                }
            }
        });
        
        // También imágenes principales
        const mainImages = document.querySelectorAll('.imagen-grande');
        mainImages.forEach((img, index) => {
            const title = img.closest('.tema-producto')?.querySelector('h2')?.textContent || 'Producto';
            const desc = img.closest('.imagen-container')?.querySelector('.imagen-leyenda span')?.textContent || '';
            
            allImages.push({
                src: img.src,
                alt: img.alt,
                title: title,
                desc: desc
            });
            
            img.addEventListener('click', () => {
                openLightbox(allImages.length - 1);
            });
        });
        
        let currentIndex = 0;
        
        // Función para abrir lightbox
        function openLightbox(index) {
            currentIndex = index;
            const imageData = allImages[currentIndex];
            
            lightboxImage.src = imageData.src;
            lightboxImage.alt = imageData.alt;
            lightboxTitle.textContent = imageData.title;
            lightboxDesc.textContent = imageData.desc;
            
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        // Función para cerrar lightbox
        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        
        // Función para mostrar imagen anterior
        function showPrevImage() {
            currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
            const imageData = allImages[currentIndex];
            
            lightboxImage.style.opacity = '0';
            setTimeout(() => {
                lightboxImage.src = imageData.src;
                lightboxImage.alt = imageData.alt;
                lightboxTitle.textContent = imageData.title;
                lightboxDesc.textContent = imageData.desc;
                lightboxImage.style.opacity = '1';
            }, 300);
        }
        
        // Función para mostrar siguiente imagen
        function showNextImage() {
            currentIndex = (currentIndex + 1) % allImages.length;
            const imageData = allImages[currentIndex];
            
            lightboxImage.style.opacity = '0';
            setTimeout(() => {
                lightboxImage.src = imageData.src;
                lightboxImage.alt = imageData.alt;
                lightboxTitle.textContent = imageData.title;
                lightboxDesc.textContent = imageData.desc;
                lightboxImage.style.opacity = '1';
            }, 300);
        }
        
        // Event Listeners
        closeBtn.addEventListener('click', closeLightbox);
        prevBtn.addEventListener('click', showPrevImage);
        nextBtn.addEventListener('click', showNextImage);
        
        // Cerrar con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showPrevImage();
            if (e.key === 'ArrowRight') showNextImage();
        });
        
        // Cerrar haciendo click fuera de la imagen
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        
        console.log(`🖼️ Lightbox configurado con ${allImages.length} imágenes`);
    }
    
    // ============================================
    // 2. ANIMACIONES AL HACER SCROLL
    // ============================================
    
    function initScrollAnimations() {
        const temas = document.querySelectorAll('.tema-producto');
        const cards = document.querySelectorAll('.visualizacion-card, .subtema-card, .beneficio-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Delay escalonado
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Configurar animaciones iniciales
        temas.forEach(tema => {
            tema.style.opacity = '0';
            tema.style.transform = 'translateY(30px)';
            tema.style.transition = 'all 0.6s ease';
            observer.observe(tema);
        });
        
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.4s ease';
            observer.observe(card);
        });
    }
    
    // ============================================
    // 3. FILTROS POR PRODUCTO (opcional futuro)
    // ============================================
    
    function initProductFilters() {
        // Crear botones de filtro si se necesitan en el futuro
        const filterContainer = document.createElement('div');
        filterContainer.className = 'filtros-productos';
        filterContainer.innerHTML = `
            <div class="filtros-titulo">
                <i class="fas fa-filter"></i>
                <span>Filtrar por producto:</span>
            </div>
            <div class="filtros-botones">
                <button class="filtro-btn activo" data-filtro="todos">
                    <i class="fas fa-cubes"></i> Todos
                </button>
                <button class="filtro-btn" data-filtro="modulo">
                    <i class="fas fa-microchip"></i> Módulo
                </button>
                <button class="filtro-btn" data-filtro="arnes">
                    <i class="fas fa-bolt"></i> Arnes
                </button>
                <button class="filtro-btn" data-filtro="sensores">
                    <i class="fas fa-tachometer-alt"></i> Sensores
                </button>
            </div>
        `;
        
        // Insertar después del hero si se quiere usar
        // document.querySelector('.cubicaje-hero').after(filterContainer);
    }
    
    // ============================================
    // 4. CONTADORES ANIMADOS (para números ficticios)
    // ============================================
    
    function initCounters() {
        const counters = document.querySelectorAll('.info-item span');
        
        counters.forEach(counter => {
            const text = counter.textContent;
            const numberMatch = text.match(/(\d+[,.]?\d*)/);
            
            if (numberMatch) {
                const finalNumber = parseFloat(numberMatch[0].replace(',', ''));
                const prefix = text.split(numberMatch[0])[0];
                const suffix = text.split(numberMatch[0])[1] || '';
                
                counter.textContent = prefix + '0' + suffix;
                
                const observer = new IntersectionObserver((entries) => {
                    if (entries[0].isIntersecting) {
                        animateCounter(counter, finalNumber, prefix, suffix);
                        observer.unobserve(counter);
                    }
                }, { threshold: 0.5 });
                
                observer.observe(counter);
            }
        });
        
        function animateCounter(element, finalValue, prefix, suffix) {
            let current = 0;
            const increment = finalValue / 50; // 50 pasos
            const duration = 1500; // 1.5 segundos
            const stepTime = duration / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= finalValue) {
                    element.textContent = prefix + finalValue.toLocaleString() + suffix;
                    clearInterval(timer);
                } else {
                    element.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
                }
            }, stepTime);
        }
    }
    
    // ============================================
    // 5. HOVER EFFECTS MEJORADOS
    // ============================================
    
    function initHoverEffects() {
        // Efecto de brillo en cards
        const cards = document.querySelectorAll('.visualizacion-card, .subtema-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.zIndex = '10';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.zIndex = '1';
            });
        });
        
        // Efecto de parpadeo en iconos
        const icons = document.querySelectorAll('.tema-icono, .header-icono');
        
        setInterval(() => {
            const randomIcon = icons[Math.floor(Math.random() * icons.length)];
            randomIcon.style.boxShadow = '0 0 20px rgba(229, 62, 62, 0.5)';
            
            setTimeout(() => {
                randomIcon.style.boxShadow = '';
            }, 500);
        }, 3000);
    }
    
    // ============================================
    // 6. SCROLL SUAVE A SECCIONES
    // ============================================
    
    function initSmoothScroll() {
        // Si agregas un índice de contenidos en el futuro
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
    
    // ============================================
    // 7. DETECCIÓN DE IMÁGENES FALTANTES
    // ============================================
    
    function checkMissingImages() {
        const images = document.querySelectorAll('img');
        let missingCount = 0;
        
        images.forEach(img => {
            img.addEventListener('error', function() {
                this.style.border = '2px dashed #e53e3e';
                this.style.padding = '20px';
                this.alt = '⚠️ Imagen no encontrada: ' + this.alt;
                missingCount++;
                
                // Crear mensaje de error
                const errorMsg = document.createElement('div');
                errorMsg.className = 'image-error';
                errorMsg.innerHTML = `
                    <i class="fas fa-exclamation-triangle"></i>
                    <span>Reemplazar imagen: ${this.src.split('/').pop()}</span>
                `;
                errorMsg.style.cssText = `
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    background: #e53e3e;
                    color: white;
                    padding: 5px 10px;
                    border-radius: 4px;
                    font-size: 0.8rem;
                    z-index: 100;
                `;
                
                this.parentElement.style.position = 'relative';
                this.parentElement.appendChild(errorMsg);
            });
        });
        
        if (missingCount > 0) {
            console.warn(`⚠️ ${missingCount} imágenes no encontradas`);
        }
    }
    
    // ============================================
    // 8. INICIALIZACIÓN COMPLETA
    // ============================================
    
    function initCubicaje() {
        console.log('🚀 Inicializando página de Cubicaje');
        
        // Inicializar todas las funcionalidades
        initLightbox();
        initScrollAnimations();
        initProductFilters(); // Opcional
        initCounters();
        initHoverEffects();
        initSmoothScroll();
        checkMissingImages();
        
        // Añadir estilo para zoom en imágenes
        const style = document.createElement('style');
        style.textContent = `
            .visualizacion-imagen img,
            .subtema-imagen img,
            .imagen-grande {
                cursor: zoom-in;
            }
            
            .image-error {
                animation: pulse 2s infinite;
            }
            
            @keyframes pulse {
                0% { opacity: 0.7; }
                50% { opacity: 1; }
                100% { opacity: 0.7; }
            }
        `;
        document.head.appendChild(style);
        
        console.log('✅ Página de Cubicaje inicializada');
    }
    
    // ============================================
    // 9. MANEJO DE ERRORES
    // ============================================
    
    function initErrorHandling() {
        window.addEventListener('error', function(e) {
            console.error('Error en página Cubicaje:', e.error);
        });
        
        // Verificar si IntersectionObserver está disponible
        if (!('IntersectionObserver' in window)) {
            console.warn('IntersectionObserver no soportado');
            // Fallback: mostrar todo inmediatamente
            document.querySelectorAll('.tema-producto, .visualizacion-card, .subtema-card').forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'none';
            });
        }
    }
    
    // ============================================
    // 10. EJECUCIÓN
    // ============================================
    
    initErrorHandling();
    initCubicaje();
    
    // Exportar funciones para uso global
    window.Cubicaje = {
        openImage: function(imageSrc, title, description) {
            // Función para abrir imagen desde consola
            const lightbox = document.getElementById('lightbox');
            const lightboxImage = lightbox.querySelector('.lightbox-image');
            const lightboxTitle = lightbox.querySelector('.lightbox-title');
            const lightboxDesc = lightbox.querySelector('.lightbox-desc');
            
            lightboxImage.src = imageSrc;
            lightboxTitle.textContent = title || 'Imagen';
            lightboxDesc.textContent = description || '';
            
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        },
        reloadAnimations: function() {
            initScrollAnimations();
        }
    };
    
    console.log('📦 JS de Cubicaje cargado exitosamente');
});