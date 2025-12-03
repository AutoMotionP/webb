// INDUSTRIA 4.0 - JavaScript con animaciones chidas
document.addEventListener('DOMContentLoaded', function() {
    console.log('🤖 AutoMotion Parts - Industria 4.0 cargada');
    
    // ============================================
    // 1. ANIMACIONES DE SCROLL
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
                
                // Animación especial para cards de tecnología
                if (entry.target.classList.contains('tecnologia-card')) {
                    const index = Array.from(document.querySelectorAll('.tecnologia-card')).indexOf(entry.target);
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 200);
                }
                
                // Animación para items de impacto
                if (entry.target.classList.contains('impacto-item')) {
                    const index = Array.from(document.querySelectorAll('.impacto-item')).indexOf(entry.target);
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
                
                // Animación para etapas del diagrama
                if (entry.target.classList.contains('etapa')) {
                    const index = Array.from(document.querySelectorAll('.etapa')).indexOf(entry.target);
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 150);
                }
            }
        });
    }, observerOptions);
    
    // Elementos a animar
    const elementosParaAnimar = [
        '.tecnologia-card',
        '.impacto-item',
        '.tecnologia-columna',
        '.estadistica-item',
        '.beneficio-item',
        '.impacto-card',
        '.etapa'
    ];
    
    elementosParaAnimar.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.style.opacity = '0';
            
            if (selector === '.etapa') {
                element.style.transform = 'translateX(-20px)';
            } else {
                element.style.transform = 'translateY(30px)';
            }
            
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    });
    
    // ============================================
    // 2. EFECTOS HOVER MEJORADOS
    // ============================================
    
    // Efecto para cards de tecnología
    document.querySelectorAll('.tecnologia-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icono = this.querySelector('.tecnologia-icono');
            if (icono) {
                icono.style.transform = 'scale(1.15) rotate(8deg)';
            }
            
            // Efecto de brillo
            this.style.boxShadow = '0 25px 50px -12px rgba(128, 90, 213, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icono = this.querySelector('.tecnologia-icono');
            if (icono) {
                icono.style.transform = 'scale(1) rotate(0deg)';
            }
            
            this.style.boxShadow = '';
        });
    });
    
    // Efecto para imágenes
    document.querySelectorAll('.imagen-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            const img = this.querySelector('.tecnologia-img');
            if (img) {
                img.style.transform = 'scale(1.08)';
            }
            
            const leyenda = this.querySelector('.leyenda-imagen');
            if (leyenda) {
                leyenda.style.background = 'linear-gradient(transparent, rgba(128, 90, 213, 0.9))';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const img = this.querySelector('.tecnologia-img');
            if (img) {
                img.style.transform = 'scale(1.05)';
            }
            
            const leyenda = this.querySelector('.leyenda-imagen');
            if (leyenda) {
                leyenda.style.background = 'linear-gradient(transparent, rgba(0, 0, 0, 0.8))';
            }
        });
    });
    
    // ============================================
    // 3. CONTADORES ANIMADOS
    // ============================================
    function iniciarContadores() {
        const contadores = document.querySelectorAll('.estadistica-valor');
        
        contadores.forEach(contador => {
            const valorFinal = parseInt(contador.textContent.replace('%', ''));
            const duracion = 1500;
            const incremento = valorFinal / (duracion / 16);
            let valorActual = 0;
            
            const actualizarContador = () => {
                valorActual += incremento;
                if (valorActual >= valorFinal) {
                    contador.textContent = contador.textContent.includes('%') 
                        ? valorFinal + '%' 
                        : valorFinal;
                } else {
                    contador.textContent = contador.textContent.includes('%')
                        ? Math.floor(valorActual) + '%'
                        : Math.floor(valorActual);
                    requestAnimationFrame(actualizarContador);
                }
            };
            
            actualizarContador();
        });
    }
    
    // Observar sección de estadísticas
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(iniciarContadores, 500);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const iotSection = document.querySelector('.tecnologia-card:nth-child(3)');
    if (iotSection) {
        statsObserver.observe(iotSection);
    }
    
    // ============================================
    // 4. ANIMACIÓN DEL DIAGRAMA
    // ============================================
    function animarDiagrama() {
        const etapas = document.querySelectorAll('.etapa');
        const lineas = document.querySelector('.diagrama-etapas');
        
        if (lineas) {
            // Animar línea del diagrama
            lineas.style.width = '0';
            setTimeout(() => {
                lineas.style.width = '100%';
                lineas.style.transition = 'width 2s ease';
            }, 500);
        }
        
        // Animar etapas secuencialmente
        etapas.forEach((etapa, index) => {
            setTimeout(() => {
                etapa.style.opacity = '1';
                etapa.style.transform = 'translateY(0)';
                
                // Efecto de pulso en icono
                const icono = etapa.querySelector('.etapa-icono');
                if (icono) {
                    icono.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        icono.style.transform = 'scale(1)';
                    }, 300);
                }
            }, index * 400);
        });
    }
    
    // Observar sección del diagrama
    const diagramaObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animarDiagrama();
                diagramaObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    const diagramaSection = document.querySelector('.diagrama-integracion');
    if (diagramaSection) {
        diagramaObserver.observe(diagramaSection);
    }
    
    // ============================================
    // 5. EFECTO PARALLAX HERO
    // ============================================
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.industria-hero');
        
        if (hero) {
            const rate = scrolled * 0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // ============================================
    // 6. INTERACTIVIDAD BOTONES CTA
    // ============================================
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('primario')) {
                alert('📅 ¡Perfecto! Te contactaremos para agendar una demostración personalizada de nuestras soluciones Industria 4.0.');
            } else if (this.classList.contains('secundario')) {
                alert('📄 El White Paper "Transformación Digital en Exportación Automotriz" se está descargando. ¡Gracias por tu interés!');
            }
            
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
    });
    
    // ============================================
    // 7. SIMULADOR DE TECNOLOGÍAS (Interactivo)
    // ============================================
    function crearSimulador() {
        const tecnologias = [
            { nombre: 'IoT', color: '#319795', icono: 'fas fa-wifi' },
            { nombre: 'RPA', color: '#805ad5', icono: 'fas fa-robot' },
            { nombre: 'Blockchain', color: '#38a169', icono: 'fas fa-link' },
            { nombre: 'Impresión 3D', color: '#e53e3e', icono: 'fas fa-print' }
        ];
        
        // Crear panel de control (opcional, puedes comentar si no lo quieres)
        const panelHTML = `
            <div class="simulador-panel">
                <h4><i class="fas fa-gamepad"></i> Simulador de Tecnologías</h4>
                <div class="tecnologia-botones">
                    ${tecnologias.map(tech => `
                        <button class="tech-btn" style="--tech-color: ${tech.color}" data-tech="${tech.nombre}">
                            <i class="${tech.icono}"></i> ${tech.nombre}
                        </button>
                    `).join('')}
                </div>
                <div class="simulador-output">
                    <p id="tech-output">Selecciona una tecnología para ver su impacto</p>
                </div>
            </div>
        `;
        
        // Inyectar en la página
        const panelContainer = document.createElement('div');
        panelContainer.innerHTML = panelHTML;
        panelContainer.classList.add('simulador-container');
        
        // Agregar después del diagrama
        const diagramaSection = document.querySelector('.diagrama-integracion');
        if (diagramaSection) {
            diagramaSection.appendChild(panelContainer);
            
            // Event listeners para botones
            document.querySelectorAll('.tech-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const tech = this.getAttribute('data-tech');
                    const mensajes = {
                        'IoT': '🌐 Conectando sensores en tiempo real... Monitoreo activado de temperatura, humedad y ubicación.',
                        'RPA': '🤖 Automatizando procesos administrativos... Tareas repetitivas optimizadas en un 95%.',
                        'Blockchain': '⛓️ Registrando transacción en libro inmutable... Trazabilidad asegurada desde origen.',
                        'Impresión 3D': '🖨️ Fabricando componente bajo demanda... Inventarios optimizados y desperdicio reducido.'
                    };
                    
                    document.getElementById('tech-output').textContent = mensajes[tech];
                    
                    // Efecto visual
                    document.querySelectorAll('.tech-btn').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Efecto de sonido (opcional)
                    if (typeof Audio !== 'undefined') {
                        const sound = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAZGF0YQQ='); // Sonido silencioso
                        sound.play().catch(() => {});
                    }
                });
            });
        }
    }
    
    // Crear simulador después de cargar todo
    setTimeout(crearSimulador, 1000);
    
    // ============================================
    // 8. EFECTOS DE SONIDO/ANIMACIÓN (Opcionales)
    // ============================================
    
    // Efecto de partículas para hero (opcional)
    function crearParticulas() {
        if (document.querySelector('.particles')) return;
        
        const particlesHTML = `
            <div class="particles">
                ${Array.from({length: 20}, () => `
                    <div class="particle" style="
                        --size: ${Math.random() * 4 + 2}px;
                        --x: ${Math.random() * 100}%;
                        --y: ${Math.random() * 100}%;
                        --delay: ${Math.random() * 5}s;
                        --duration: ${Math.random() * 3 + 2}s;
                    "></div>
                `).join('')}
            </div>
        `;
        
        const hero = document.querySelector('.industria-hero');
        if (hero) {
            hero.insertAdjacentHTML('beforeend', particlesHTML);
        }
    }
    
    crearParticulas();
    
    // ============================================
    // 9. INYECTAR CSS ADICIONAL
    // ============================================
    const estilosAdicionales = `
        /* Efecto ripple */
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        /* Partículas flotantes */
        .particles {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        }
        
        .particle {
            position: absolute;
            width: var(--size);
            height: var(--size);
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            left: var(--x);
            top: var(--y);
            animation: float var(--duration) ease-in-out infinite;
            animation-delay: var(--delay);
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        /* Simulador */
        .simulador-container {
            margin-top: 3rem;
        }
        
        .simulador-panel {
            background: var(--white);
            padding: 2rem;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-md);
        }
        
        .simulador-panel h4 {
            color: var(--primary-blue);
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .tecnologia-botones {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        
        .tech-btn {
            padding: 0.8rem 1rem;
            background: var(--light-bg);
            border: 2px solid var(--light-bg);
            border-radius: var(--border-radius);
            color: var(--text-dark);
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }
        
        .tech-btn:hover {
            transform: translateY(-3px);
            border-color: var(--tech-color);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .tech-btn.active {
            background: var(--tech-color);
            color: white;
            border-color: var(--tech-color);
        }
        
        .simulador-output {
            background: var(--light-bg);
            padding: 1.5rem;
            border-radius: var(--border-radius);
            min-height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        #tech-output {
            color: var(--text-dark);
            font-size: 1.1rem;
            text-align: center;
            margin: 0;
        }
        
        /* Responsive simulador */
        @media (max-width: 768px) {
            .tecnologia-botones {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        
        @media (max-width: 480px) {
            .tecnologia-botones {
                grid-template-columns: 1fr;
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = estilosAdicionales;
    document.head.appendChild(styleSheet);
    
    // ============================================
    // 10. INICIALIZACIÓN COMPLETA
    // ============================================
    console.log('✅ Industria 4.0 - Todas las animaciones cargadas');
    
    // Preload de imágenes
    function preloadImages() {
        const images = [
            'img/industria-fondo.jpg',
            'img/3d-1.jpg', 'img/3d-2.jpg', 'img/3d-3.jpg',
            'img/rpa-1.jpg', 'img/blockchain-1.jpg',
            'img/iot-1.jpg', 'img/iot-2.jpg', 'img/iot-3.jpg', 'img/iot-4.jpg'
        ];
        
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    
    preloadImages();
});

// Función global para reiniciar animaciones
function reiniciarAnimacionesIndustria() {
    document.querySelectorAll('.tecnologia-card, .impacto-item, .etapa').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
    });
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.tecnologia-card, .impacto-item, .etapa').forEach(el => {
        observer.observe(el);
    });
}