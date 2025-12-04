// ============================================
// MODELO VOGEL - JAVASCRIPT CORREGIDO
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🧮 Modelo Vogel - JavaScript cargado');
    
    // ============================================
    // 1. LIGHTBOX CORREGIDO (usa rutas actuales)
    // ============================================
    
    function initLightbox() {
        console.log('🔍 Inicializando lightbox...');
        
        const lightbox = document.getElementById('lightbox');
        if (!lightbox) {
            console.error('❌ No se encontró el lightbox en el HTML');
            return;
        }
        
        const lightboxImage = lightbox.querySelector('.lightbox-image');
        const lightboxTitle = lightbox.querySelector('.lightbox-title');
        const lightboxDesc = lightbox.querySelector('.lightbox-desc');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');
        
        if (!lightboxImage || !lightboxTitle) {
            console.error('❌ Elementos del lightbox no encontrados');
            return;
        }
        
        // Obtener TODAS las imágenes de las galerías
        const galleryImages = document.querySelectorAll('.imagen-container img');
        console.log(`🔍 Encontradas ${galleryImages.length} imágenes en galerías`);
        
        const allImages = [];
        
        // Configurar cada imagen
        galleryImages.forEach((img, index) => {
            const container = img.closest('.imagen-container');
            const item = img.closest('.imagen-item');
            
            if (img && img.src) {
                const title = item?.querySelector('h3')?.textContent || 'Imagen Modelo Vogel';
                const desc = item?.querySelector('p')?.textContent || 'Detalle del método de optimización';
                const tipo = item?.closest('.maritimo') ? 'maritimo' : 'aereo';
                
                allImages.push({
                    src: img.src,
                    alt: img.alt || title,
                    title: title,
                    desc: desc,
                    tipo: tipo,
                    index: index
                });
                
                console.log(`📸 Imagen ${index}: ${img.src.split('/').pop()} - ${title}`);
                
                // Asegurar que el botón "Ampliar" funcione
                const verDetalleBtn = container?.querySelector('.ver-detalle');
                if (verDetalleBtn) {
                    // Remover listeners anteriores para evitar duplicados
                    const newVerDetalle = verDetalleBtn.cloneNode(true);
                    verDetalleBtn.parentNode.replaceChild(newVerDetalle, verDetalleBtn);
                    
                    newVerDetalle.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log(`🖱️ Click en imagen ${index}: ${title}`);
                        openLightbox(index);
                    });
                }
            }
        });
        
        if (allImages.length === 0) {
            console.error('❌ No se encontraron imágenes para el lightbox');
            console.log('🔍 Buscando en:', window.location.href);
            return;
        }
        
        let currentIndex = 0;
        
        // Función para abrir lightbox CON DEBUG
        function openLightbox(index) {
            console.log(`🚀 Abriendo lightbox con índice ${index}`);
            
            if (index < 0 || index >= allImages.length) {
                console.error(`❌ Índice ${index} fuera de rango (0-${allImages.length-1})`);
                return;
            }
            
            currentIndex = index;
            const imageData = allImages[currentIndex];
            
            console.log(`📤 Cargando imagen: ${imageData.src}`);
            console.log(`📤 Título: ${imageData.title}`);
            
            // Verificar si la imagen existe
            const imgTest = new Image();
            imgTest.onload = function() {
                console.log('✅ Imagen cargada correctamente');
                lightboxImage.src = imageData.src;
                lightboxImage.alt = imageData.alt;
                lightboxTitle.textContent = imageData.title;
                lightboxDesc.textContent = imageData.desc;
                
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Feedback visual
                lightbox.style.display = 'flex';
                setTimeout(() => {
                    lightbox.style.opacity = '1';
                }, 10);
                
                console.log('✅ Lightbox abierto correctamente');
            };
            
            imgTest.onerror = function() {
                console.error(`❌ Error al cargar imagen: ${imageData.src}`);
                console.error(`❌ Ruta completa: ${new URL(imageData.src, window.location.origin).href}`);
                
                // Mostrar placeholder
                lightboxImage.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f8fafc"/><text x="200" y="150" text-anchor="middle" font-family="Arial" font-size="16" fill="%23718096">Imagen no encontrada</text><text x="200" y="170" text-anchor="middle" font-family="Arial" font-size="12" fill="%23e53e3e">' + imageData.src.split('/').pop() + '</text></svg>';
                lightboxImage.alt = 'Imagen no encontrada';
                lightboxTitle.textContent = '⚠️ Imagen no encontrada';
                lightboxDesc.textContent = `Verifica la ruta: ${imageData.src.split('/').pop()}`;
                
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            };
            
            imgTest.src = imageData.src;
        }
        
        // Función para cerrar lightbox
        function closeLightbox() {
            console.log('🔒 Cerrando lightbox');
            lightbox.style.opacity = '0';
            setTimeout(() => {
                lightbox.classList.remove('active');
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        }
        
        // Función para mostrar imagen anterior
        function showPrevImage() {
            currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
            console.log(`⬅️ Imagen anterior: índice ${currentIndex}`);
            openLightbox(currentIndex);
        }
        
        // Función para mostrar siguiente imagen
        function showNextImage() {
            currentIndex = (currentIndex + 1) % allImages.length;
            console.log(`➡️ Siguiente imagen: índice ${currentIndex}`);
            openLightbox(currentIndex);
        }
        
        // Configurar botones
        if (closeBtn) {
            closeBtn.addEventListener('click', closeLightbox);
            console.log('✅ Botón cerrar configurado');
        }
        
        if (prevBtn) prevBtn.addEventListener('click', showPrevImage);
        if (nextBtn) nextBtn.addEventListener('click', showNextImage);
        
        // Navegación con teclado
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            
            if (e.key === 'Escape') {
                console.log('⌨️ Tecla Escape presionada');
                closeLightbox();
            }
            if (e.key === 'ArrowLeft') showPrevImage();
            if (e.key === 'ArrowRight') showNextImage();
        });
        
        // Cerrar haciendo click fuera
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                console.log('🖱️ Click fuera del lightbox');
                closeLightbox();
            }
        });
        
        console.log(`✅ Lightbox configurado con ${allImages.length} imágenes`);
        
        // Hacer visible el lightbox (pero oculto)
        lightbox.style.display = 'none';
        lightbox.style.opacity = '0';
        lightbox.style.transition = 'opacity 0.3s ease';
    }
    
    // ============================================
    // 2. VERIFICACIÓN DE IMÁGENES AL CARGAR
    // ============================================
    
    function verifyImagesOnLoad() {
        console.log('🔍 Verificando imágenes al cargar...');
        
        const images = document.querySelectorAll('img');
        let loaded = 0;
        let errors = 0;
        
        images.forEach((img, index) => {
            const testImg = new Image();
            testImg.onload = function() {
                loaded++;
                console.log(`✅ Imagen ${index}: ${img.src.split('/').pop()} - CARGADA`);
            };
            
            testImg.onerror = function() {
                errors++;
                console.error(`❌ Imagen ${index}: ${img.src} - NO ENCONTRADA`);
                
                // Marcar imagen rota
                img.style.border = '2px solid #e53e3e';
                img.style.padding = '10px';
                
                // Crear tooltip
                img.title = `Imagen no encontrada: ${img.src.split('/').pop()}`;
            };
            
            testImg.src = img.src;
        });
        
        // Resultado final
        setTimeout(() => {
            console.log(`📊 Resumen: ${loaded} imágenes cargadas, ${errors} errores`);
            
            if (errors > 0) {
                console.error(`⚠️ Hay ${errors} imágenes que no se encontraron`);
                console.error('💡 Verifica los nombres en el HTML vs los archivos reales');
            }
        }, 1000);
    }
    
    // ============================================
    // 3. FUNCIONALIDADES ADICIONALES (simplificadas)
    // ============================================
    
    function initBasicAnimations() {
        console.log('🎬 Iniciando animaciones básicas...');
        
        // Animación simple al hacer scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        // Observar elementos
        const elements = document.querySelectorAll('.imagen-item, .resultado-card, .destino-card');
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.5s ease';
            observer.observe(el);
        });
        
        console.log(`✅ ${elements.length} elementos observados para animación`);
    }
    
    // ============================================
    // 4. BOTÓN VOLVER ARRIBA SIMPLE
    // ============================================
    
    function addSimpleBackToTop() {
        const button = document.createElement('button');
        button.innerHTML = '↑';
        button.title = 'Volver arriba';
        button.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: #e53e3e;
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            z-index: 999;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            display: none;
            font-size: 20px;
            font-weight: bold;
        `;
        
        button.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        window.addEventListener('scroll', () => {
            button.style.display = window.scrollY > 500 ? 'block' : 'none';
        });
        
        document.body.appendChild(button);
        console.log('✅ Botón "Volver arriba" añadido');
    }
    
    // ============================================
    // 5. INICIALIZACIÓN PRINCIPAL
    // ============================================
    
    console.log('🚀 Iniciando Modelo Vogel...');
    
    // Verificar imágenes primero
    setTimeout(verifyImagesOnLoad, 500);
    
    // Inicializar lightbox
    setTimeout(initLightbox, 1000);
    
    // Inicializar animaciones
    initBasicAnimations();
    
    // Añadir botón volver arriba
    addSimpleBackToTop();
    
    // Manejo de errores global
    window.addEventListener('error', function(e) {
        console.error('⚠️ Error global:', e.message);
        console.error('⚠️ En:', e.filename, 'línea', e.lineno);
    });
    
    console.log('✅ Modelo Vogel inicializado');
    
    // ============================================
    // 6. FUNCIONES DE DEBUG (para consola)
    // ============================================
    
    window.debugVogel = {
        listImages: function() {
            const images = document.querySelectorAll('img');
            console.log('📋 Lista de imágenes:');
            images.forEach((img, i) => {
                console.log(`${i}: ${img.src} -> ${img.complete ? '✅' : '❌'}`);
            });
        },
        
        testLightbox: function(index = 0) {
            const lightbox = document.getElementById('lightbox');
            if (lightbox) {
                console.log('🔍 Testeando lightbox...');
                lightbox.style.display = 'flex';
                lightbox.style.opacity = '1';
                lightbox.classList.add('active');
            } else {
                console.error('❌ Lightbox no encontrado en el DOM');
            }
        },
        
        checkImagePaths: function() {
            console.log('🔍 Verificando rutas de imágenes...');
            const baseUrl = window.location.origin;
            document.querySelectorAll('img').forEach(img => {
                const fullUrl = new URL(img.src, baseUrl).href;
                console.log(`🖼️ ${img.alt}: ${fullUrl}`);
            });
        }
    };
    
    console.log('💡 Usa debugVogel en la consola para diagnosticar problemas');
    console.log('💡 Ejemplos: debugVogel.listImages() o debugVogel.checkImagePaths()');
});

// ============================================
// POLYFILL PARA INTERSECTION OBSERVER
// ============================================

if (!('IntersectionObserver' in window)) {
    console.warn('⚠️ IntersectionObserver no soportado, usando fallback');
    // Fallback simple
    document.querySelectorAll('.imagen-item, .resultado-card, .destino-card').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
    });
}