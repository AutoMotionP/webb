// COSTOS LOGÍSTICOS - Lightbox Pantalla Completa
document.addEventListener('DOMContentLoaded', function() {
    console.log('🖼️ AutoMotion Parts - Lightbox Pantalla Completa');
    
    // ============================================
    // 1. CONFIGURACIÓN BÁSICA
    // ============================================
    
    // Lista de imágenes (ajusta según tus imágenes)
    const imagenes = [
        {
            src: 'img/costos1.jpg',
            alt: 'Transporte Marítimo - Análisis de Costos',
            titulo: 'Costos Logísticos - Transporte Marítimo',
            descripcion: 'Desglose detallado de costos por contenedor marítimo. Incluye BOM, fletes, almacenaje y gastos operativos.'
        },
        {
            src: 'img/costos2.jpg',
            alt: 'Transporte Aéreo - Comparativa de Costos',
            titulo: 'Costos Logísticos - Transporte Aéreo',
            descripcion: 'Análisis comparativo de costos aéreos. Detalla fletes especiales, tiempos de entrega y costos unitarios.'
        }
        // Añade más imágenes si las tienes
    ];
    
    let imagenActual = 0;
    
    // ============================================
    // 2. ELEMENTOS DEL DOM
    // ============================================
    
    const lightbox = document.getElementById('fullscreenLightbox');
    const lightboxImg = document.getElementById('fullscreenImage');
    const lightboxTitle = document.getElementById('fullscreenTitle');
    const lightboxDesc = document.getElementById('fullscreenDesc');
    const lightboxCounter = document.getElementById('fullscreenCounter');
    const closeBtn = document.getElementById('fullscreenClose');
    const prevBtn = document.getElementById('fullscreenPrev');
    const nextBtn = document.getElementById('fullscreenNext');
    
    // ============================================
    // 3. FUNCIONES PRINCIPALES
    // ============================================
    
    // Función para ABRIR el lightbox
    function abrirLightbox(indice) {
        if (indice < 0 || indice >= imagenes.length) return;
        
        imagenActual = indice;
        actualizarLightbox();
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Bloquear scroll
        document.documentElement.style.overflow = 'hidden';
        
        console.log('🔍 Lightbox abierto - Imagen:', indice + 1);
    }
    
    // Función para CERRAR el lightbox
    function cerrarLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restaurar scroll
        document.documentElement.style.overflow = 'auto';
    }
    
    // Función para ACTUALIZAR contenido
    function actualizarLightbox() {
        const img = imagenes[imagenActual];
        
        // Añadir efecto de cambio
        lightboxImg.classList.add('changing');
        
        // Actualizar imagen
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        
        // Actualizar texto
        lightboxTitle.textContent = img.titulo;
        lightboxDesc.textContent = img.descripcion;
        
        // Actualizar contador
        lightboxCounter.textContent = `${imagenActual + 1}/${imagenes.length}`;
        
        // Remover clase de animación después de un tiempo
        setTimeout(() => {
            lightboxImg.classList.remove('changing');
        }, 400);
    }
    
    // Función para imagen ANTERIOR
    function imagenAnterior() {
        imagenActual = (imagenActual - 1 + imagenes.length) % imagenes.length;
        actualizarLightbox();
    }
    
    // Función para imagen SIGUIENTE
    function imagenSiguiente() {
        imagenActual = (imagenActual + 1) % imagenes.length;
        actualizarLightbox();
    }
    
    // ============================================
    // 4. CONFIGURAR EVENTOS
    // ============================================
    
    // Eventos para los botones del lightbox
    closeBtn.addEventListener('click', cerrarLightbox);
    prevBtn.addEventListener('click', imagenAnterior);
    nextBtn.addEventListener('click', imagenSiguiente);
    
    // Cerrar con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape' || e.key === 'Escape') {
            cerrarLightbox();
        } else if (e.key === 'ArrowLeft') {
            imagenAnterior();
        } else if (e.key === 'ArrowRight') {
            imagenSiguiente();
        }
    });
    
    // Cerrar al hacer click fuera de la imagen
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target.classList.contains('fullscreen-lightbox')) {
            cerrarLightbox();
        }
    });
    
    // Prevenir que el click en la imagen cierre el lightbox
    lightboxImg.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // ============================================
    // 5. HACER LAS IMÁGENES CLICKEABLES
    // ============================================
    
    function configurarImagenes() {
        console.log('🎯 Configurando imágenes...');
        
        // Imagen 1 - Marítimo
        const imagenMaritima = document.querySelector('.maritimo .transporte-imagen');
        if (imagenMaritima) {
            // Crear o seleccionar botón
            let boton = imagenMaritima.querySelector('.boton-ampliar');
            if (!boton) {
                boton = document.createElement('button');
                boton.className = 'boton-ampliar';
                boton.innerHTML = '<i class="fas fa-expand"></i> Ver a pantalla completa';
                imagenMaritima.appendChild(boton);
            }
            
            // Hacer imagen clickeable
            const img = imagenMaritima.querySelector('.imagen-transporte');
            if (img) {
                img.style.cursor = 'pointer';
                img.addEventListener('click', function() {
                    abrirLightbox(0);
                });
            }
            
            // Evento para el botón
            boton.addEventListener('click', function(e) {
                e.stopPropagation();
                abrirLightbox(0);
            });
            
            // Evento para el contenedor
            imagenMaritima.addEventListener('click', function(e) {
                if (!e.target.classList.contains('boton-ampliar')) {
                    abrirLightbox(0);
                }
            });
            
            console.log('✅ Imagen marítima configurada');
        }
        
        // Imagen 2 - Aéreo
        const imagenAerea = document.querySelector('.aereo .transporte-imagen');
        if (imagenAerea) {
            // Crear o seleccionar botón
            let boton = imagenAerea.querySelector('.boton-ampliar');
            if (!boton) {
                boton = document.createElement('button');
                boton.className = 'boton-ampliar';
                boton.innerHTML = '<i class="fas fa-expand"></i> Ver a pantalla completa';
                imagenAerea.appendChild(boton);
            }
            
            // Hacer imagen clickeable
            const img = imagenAerea.querySelector('.imagen-transporte');
            if (img) {
                img.style.cursor = 'pointer';
                img.addEventListener('click', function() {
                    abrirLightbox(1);
                });
            }
            
            // Evento para el botón
            boton.addEventListener('click', function(e) {
                e.stopPropagation();
                abrirLightbox(1);
            });
            
            // Evento para el contenedor
            imagenAerea.addEventListener('click', function(e) {
                if (!e.target.classList.contains('boton-ampliar')) {
                    abrirLightbox(1);
                }
            });
            
            console.log('✅ Imagen aérea configurada');
        }
    }
    
    // ============================================
    // 6. VERIFICAR QUE LAS IMÁGENES EXISTAN
    // ============================================
    
    function verificarImagenes() {
        imagenes.forEach((img, index) => {
            const testImg = new Image();
            testImg.onload = function() {
                console.log(`✅ Imagen ${index + 1} cargada: ${img.src}`);
            };
            testImg.onerror = function() {
                console.error(`❌ Imagen no encontrada: ${img.src}`);
                // Mostrar mensaje amigable
                const seccion = document.querySelectorAll('.transporte-imagen')[index];
                if (seccion) {
                    const errorMsg = document.createElement('div');
                    errorMsg.innerHTML = `
                        <div style="text-align:center; padding:20px; background:#ffe6e6; border-radius:8px; margin:10px 0;">
                            <i class="fas fa-exclamation-triangle" style="color:#e53e3e; font-size:24px; margin-bottom:10px;"></i>
                            <p style="color:#333; font-weight:bold;">Imagen no encontrada</p>
                            <p style="color:#666; font-size:0.9rem;">Reemplazar: ${img.src}</p>
                        </div>
                    `;
                    seccion.appendChild(errorMsg);
                }
            };
            testImg.src = img.src;
        });
    }
    
    // ============================================
    // 7. ANIMACIONES BÁSICAS AL SCROLL
    // ============================================
    
    function configurarAnimaciones() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        // Animar elementos al hacer scroll
        const elementos = [
            '.intro-card',
            '.transporte-seccion',
            '.impacto-card',
            '.margen-card',
            '.conclusion-final'
        ];
        
        elementos.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'all 0.6s ease';
                observer.observe(el);
            });
        });
    }
    
    // ============================================
    // 8. INICIALIZAR TODO
    // ============================================
    
    function inicializar() {
        console.log('🚀 Iniciando AutoMotion Parts Costos...');
        
        // 1. Configurar imágenes clickeables
        configurarImagenes();
        
        // 2. Verificar que las imágenes existan
        verificarImagenes();
        
        // 3. Configurar animaciones
        configurarAnimaciones();
        
        // 4. Exponer funciones globales para debug
        window.AutoMotionLightbox = {
            abrir: abrirLightbox,
            cerrar: cerrarLightbox,
            anterior: imagenAnterior,
            siguiente: imagenSiguiente,
            totalImagenes: imagenes.length
        };
        
        console.log('✅ Sistema listo. Lightbox pantalla completa activado.');
        console.log('💡 Tip: Click en cualquier imagen o botón "Ver a pantalla completa"');
    }
    
    // Iniciar después de un breve delay
    setTimeout(inicializar, 300);
});