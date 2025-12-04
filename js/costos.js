// COSTOS LOGÍSTICOS - JavaScript CORREGIDO
document.addEventListener('DOMContentLoaded', function() {
    console.log('💰 AutoMotion Parts - Costos Logísticos cargado');
    
    // ============================================
    // 1. ANIMACIONES AL SCROLL
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animación para tablas
                if (entry.target.classList.contains('tabla-costos')) {
                    const rows = entry.target.querySelectorAll('tbody tr');
                    rows.forEach((row, index) => {
                        setTimeout(() => {
                            row.style.opacity = '1';
                            row.style.transform = 'translateX(0)';
                        }, index * 50);
                    });
                }
                
                // Animación para cards
                if (entry.target.classList.contains('impacto-card') || 
                    entry.target.classList.contains('margen-card')) {
                    const index = Array.from(document.querySelectorAll('.impacto-card, .margen-card')).indexOf(entry.target);
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 200);
                }
            }
        });
    }, observerOptions);
    
    // Elementos a animar
    const elementosParaAnimar = [
        '.intro-card',
        '.transporte-seccion',
        '.impacto-card',
        '.margen-card',
        '.conclusion-final',
        '.tabla-costos'
    ];
    
    elementosParaAnimar.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    });
    
    // Animación específica para filas de tabla
    document.querySelectorAll('.tabla-costos tbody tr').forEach(row => {
        row.style.opacity = '0';
        row.style.transform = 'translateX(-20px)';
        row.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // ============================================
    // 2. EFECTOS HOVER MEJORADOS
    // ============================================
    
    // Efecto para tarjetas
    document.querySelectorAll('.impacto-card, .margen-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icono = this.querySelector('.impacto-icono, .margen-icono');
            if (icono) {
                icono.style.transform = 'scale(1.15) rotate(8deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icono = this.querySelector('.impacto-icono, .margen-icono');
            if (icono) {
                icono.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // Efecto para filas de tabla
    document.querySelectorAll('.tabla-costos tbody tr').forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(26, 54, 93, 0.05)';
        });
        
        row.addEventListener('mouseleave', function() {
            if (this.classList.contains('total-fila')) {
                this.style.backgroundColor = 'rgba(56, 161, 105, 0.1)';
            } else if (this.classList.contains('precio-fila')) {
                this.style.backgroundColor = 'rgba(229, 62, 62, 0.1)';
            } else {
                this.style.backgroundColor = '';
            }
        });
    });
    
    // Efecto para iconos de transporte
    document.querySelectorAll('.transporte-icono').forEach(icono => {
        icono.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        icono.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // ============================================
    // 3. SCROLL SUAVE Y HEADER
    // ============================================
    
    // Smooth scroll para navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // ============================================
    // 4. FUNCIONALIDAD PARA BOTONES
    // ============================================
    
    // Botón CTA
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            alert('📊 Te contactaremos para un análisis personalizado de costos logísticos. ¡Gracias por confiar en AutoMotion Parts!');
            
            // Efecto de clic
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Efecto ripple
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            
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
    }
    
    // ============================================
    // 5. ANIMACIONES ESPECIALES
    // ============================================
    
    // Contadores para márgenes
    function animarContadores() {
        const margenes = document.querySelectorAll('.margen-anterior, .margen-nuevo');
        
        margenes.forEach(margen => {
            const texto = margen.textContent;
            const numero = parseFloat(texto.replace('%', ''));
            
            if (!isNaN(numero)) {
                let contador = 0;
                const incremento = numero / 20;
                const intervalo = setInterval(() => {
                    contador += incremento;
                    if (contador >= numero) {
                        margen.textContent = texto;
                        clearInterval(intervalo);
                    } else {
                        margen.textContent = contador.toFixed(2) + (texto.includes('%') ? '%' : '');
                    }
                }, 50);
            }
        });
    }
    
    // Observar sección de conclusiones
    const conclusionesObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animarContadores, 500);
                conclusionesObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const conclusionesSection = document.querySelector('.conclusiones-financieras');
    if (conclusionesSection) {
        conclusionesObserver.observe(conclusionesSection);
    }
    
    // ============================================
    // 6. INYECTAR CSS ADICIONAL
    // ============================================
    const estilosAdicionales = `
        /* Efecto ripple */
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        /* Resaltar cambios en precios */
        .tabla-costos tbody tr:hover td {
            transition: all 0.3s ease;
        }
        
        .total-fila:hover td {
            background-color: rgba(56, 161, 105, 0.2) !important;
        }
        
        .precio-fila:hover td {
            background-color: rgba(229, 62, 62, 0.2) !important;
        }
        
        /* Animación para imágenes */
        .transporte-imagen {
            transition: all 0.3s ease;
        }
        
        .transporte-imagen:hover {
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.3) !important;
        }
        
        /* Efecto para badges de margen */
        .margen-badge {
            transition: all 0.3s ease;
        }
        
        .margen-card:hover .margen-badge {
            transform: scale(1.05);
        }
        
        /* Animación para lightbox */
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes scaleIn {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = estilosAdicionales;
    document.head.appendChild(styleSheet);
    
    // ============================================
    // 7. LIGHTBOX PARA AMPLIAR IMÁGENES
    // ============================================
    
    function initLightbox() {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox) {
            console.warn('⚠️ Lightbox no encontrado en el HTML');
            return;
        }
        
        const lightboxImage = lightbox.querySelector('.lightbox-image');
        const lightboxTitle = lightbox.querySelector('.lightbox-title');
        const lightboxDesc = lightbox.querySelector('.lightbox-desc');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');
        
        // Crear botones de ampliar en cada imagen
        document.querySelectorAll('.transporte-imagen').forEach((container, index) => {
            const img = container.querySelector('.imagen-transporte');
            if (!img) return;
            
            const title = container.closest('.transporte-seccion')?.querySelector('h2')?.textContent || '';
            
            // Crear botón de ampliar
            const ampliarBtn = document.createElement('button');
            ampliarBtn.className = 'boton-ampliar';
            ampliarBtn.innerHTML = '<i class="fas fa-expand"></i> Ampliar';
            container.appendChild(ampliarBtn);
            
            // Hacer clickeable toda la imagen
            container.style.cursor = 'pointer';
            
            // Agregar eventos
            container.addEventListener('click', (e) => {
                if (!e.target.classList.contains('boton-ampliar')) {
                    openLightbox(index);
                }
            });
            
            ampliarBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openLightbox(index);
            });
        });
        
        // Obtener todas las imágenes
        const allImages = Array.from(document.querySelectorAll('.imagen-transporte')).map((img, index) => {
            const container = img.closest('.transporte-imagen');
            const section = container?.closest('.transporte-seccion');
            const title = section?.querySelector('h2')?.textContent || '';
            const desc = container?.querySelector('.imagen-leyenda p')?.textContent || '';
            
            return {
                src: img.src,
                alt: img.alt,
                title: title,
                desc: desc
            };
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
            
            // Efecto de entrada
            lightboxImage.style.opacity = '0';
            setTimeout(() => {
                lightboxImage.style.opacity = '1';
            }, 50);
        }
        
        // Función para cerrar lightbox
        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Efecto de salida
            lightboxImage.style.opacity = '0';
        }
        
        // Función para mostrar imagen anterior
        function showPrevImage() {
            currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
            updateLightboxImage();
        }
        
        // Función para mostrar siguiente imagen
        function showNextImage() {
            currentIndex = (currentIndex + 1) % allImages.length;
            updateLightboxImage();
        }
        
        // Actualizar imagen en lightbox
        function updateLightboxImage() {
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
            if (!lightbox.classList.contains('active')) return;
            
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showPrevImage();
            if (e.key === 'ArrowRight') showNextImage();
        });
        
        // Cerrar haciendo click fuera de la imagen
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        
        // Prevenir scroll cuando lightbox está abierto
        lightbox.addEventListener('wheel', (e) => {
            if (lightbox.classList.contains('active')) {
                e.preventDefault();
            }
        }, { passive: false });
        
        console.log(`🖼️ Lightbox configurado con ${allImages.length} imágenes`);
        
        // Exportar función para abrir desde consola
        window.abrirImagen = function(index) {
            if (index >= 0 && index < allImages.length) {
                openLightbox(index);
            }
        };
    }
    
    // ============================================
    // 8. MANEJO DE IMÁGENES Y ERRORES
    // ============================================
    
    function checkImages() {
        const images = document.querySelectorAll('.imagen-transporte');
        
        images.forEach((img, index) => {
            img.addEventListener('error', function() {
                console.warn(`⚠️ Imagen no encontrada: ${this.src}`);
                this.style.border = '2px dashed var(--accent-red)';
                this.style.padding = '20px';
                this.alt = '⚠️ Imagen no disponible';
                
                // Ocultar botón de ampliar si hay error
                const container = this.closest('.transporte-imagen');
                const ampliarBtn = container?.querySelector('.boton-ampliar');
                if (ampliarBtn) {
                    ampliarBtn.style.display = 'none';
                }
                
                // Mensaje de error
                const errorMsg = document.createElement('div');
                errorMsg.innerHTML = `
                    <i class="fas fa-exclamation-triangle"></i>
                    <span>Reemplazar imagen</span>
                `;
                errorMsg.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: var(--accent-red);
                    color: white;
                    padding: 10px 15px;
                    border-radius: 8px;
                    font-size: 0.9rem;
                    z-index: 100;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    white-space: nowrap;
                `;
                
                const containerImg = this.closest('.transporte-imagen');
                if (containerImg) {
                    containerImg.style.position = 'relative';
                    containerImg.appendChild(errorMsg);
                }
            });
            
            // Añadir título para accesibilidad
            img.setAttribute('title', 'Click para ampliar');
        });
    }
    
    // ============================================
    // 9. INICIALIZACIÓN DE CONTADORES
    // ============================================
    
    function initContadores() {
        // Ya está implementado en la sección 5
        // Esta función es solo para organización
        console.log('🔢 Contadores inicializados');
    }
    
    // ============================================
    // 10. INICIALIZACIÓN COMPLETA
    // ============================================
    
    function initCostosCompleto() {
        console.log('🚀 Inicializando página de Costos Logísticos');
        
        try {
            // Inicializar todas las funcionalidades
            initLightbox();
            checkImages();
            
            console.log('✅ Costos Logísticos - Todas las funcionalidades cargadas');
        } catch (error) {
            console.error('❌ Error al inicializar:', error);
        }
    }
    
    // Inicializar cuando todo esté listo
    setTimeout(initCostosCompleto, 100);
    
    // ============================================
    // FUNCIONES GLOBALES PARA DEBUG
    // ============================================
    
    // Exportar funciones para uso global
    window.CostosLogisticos = {
        scrollToSection: function(sectionId) {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        },
        highlightRow: function(rowIndex) {
            const rows = document.querySelectorAll('.tabla-costos tbody tr');
            if (rows[rowIndex]) {
                rows[rowIndex].style.backgroundColor = 'rgba(229, 62, 62, 0.1)';
                setTimeout(() => {
                    if (rows[rowIndex].classList.contains('total-fila')) {
                        rows[rowIndex].style.backgroundColor = 'rgba(56, 161, 105, 0.1)';
                    } else if (rows[rowIndex].classList.contains('precio-fila')) {
                        rows[rowIndex].style.backgroundColor = 'rgba(229, 62, 62, 0.1)';
                    } else {
                        rows[rowIndex].style.backgroundColor = '';
                    }
                }, 2000);
            }
        },
        testLightbox: function() {
            if (window.abrirImagen) {
                window.abrirImagen(0);
            }
        }
    };
    
    console.log('📊 JS de Costos Logísticos cargado exitosamente');
});