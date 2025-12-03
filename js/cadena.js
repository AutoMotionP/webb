// ============================================
// CADENA DE SUMINISTROS - JS INTERACTIVO
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚚 Cadena de Suministros - JavaScript cargado');
    
    // ============================================
    // 1. ANIMACIÓN DE NODOS LOGÍSTICOS
    // ============================================
    
    function initNodosAnimacion() {
        const nodos = document.querySelectorAll('.nodo-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Delay escalonado para cada nodo
                    setTimeout(() => {
                        entry.target.classList.add('nodo-visible');
                        
                        // Animar marcador
                        const marcador = entry.target.querySelector('.marcador-numero');
                        if (marcador) {
                            marcador.style.animation = 'bounceIn 0.6s ease forwards';
                        }
                        
                        // Animar contenido
                        const contenido = entry.target.querySelector('.nodo-contenido');
                        if (contenido) {
                            contenido.style.animation = 'slideInRight 0.8s ease forwards';
                        }
                    }, index * 200); // 200ms de delay entre cada nodo
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        });
        
        nodos.forEach(nodo => observer.observe(nodo));
        
        // Añadir eventos de hover para detalles
        nodos.forEach(nodo => {
            nodo.addEventListener('mouseenter', function() {
                this.classList.add('nodo-hover');
                
                // Resaltar la línea del marcador
                const linea = this.querySelector('.marcador-linea');
                if (linea) {
                    linea.style.background = 'var(--accent-red)';
                    linea.style.height = '100%';
                }
            });
            
            nodo.addEventListener('mouseleave', function() {
                this.classList.remove('nodo-hover');
                
                // Restaurar línea
                const linea = this.querySelector('.marcador-linea');
                if (linea) {
                    linea.style.background = 'var(--primary-blue)';
                    linea.style.height = 'calc(100% - 60px)';
                }
            });
            
            // Click para expandir/contraer
            nodo.addEventListener('click', function(e) {
                if (e.target.closest('.nodo-marcador') || e.target.closest('.nodo-icono')) {
                    this.classList.toggle('nodo-expandido');
                    
                    if (this.classList.contains('nodo-expandido')) {
                        console.log(`Nodo ${this.dataset.nodo} expandido`);
                        // Podrías añadir más funcionalidad aquí
                    }
                }
            });
        });
    }
    
    // ============================================
    // 2. INTERACTIVIDAD DEL MAPA
    // ============================================
    
    function initMapaInteractivo() {
        const mapaImagen = document.querySelector('.mapa-imagen');
        const leyendaItems = document.querySelectorAll('.leyenda-item');
        
        if (!mapaImagen) return;
        
        // Crear puntos interactivos en el mapa (simulados)
        const puntosInteractivos = [
            { 
                nombre: 'Proveedores México', 
                tipo: 'proveedor', 
                x: '25%', 
                y: '40%',
                descripcion: 'Red de proveedores certificados en México'
            },
            { 
                nombre: 'Planta Jalisco', 
                tipo: 'planta', 
                x: '30%', 
                y: '38%',
                descripcion: 'Planta de fabricación en Jalisco, México'
            },
            { 
                nombre: 'Puerto Veracruz', 
                tipo: 'puerto', 
                x: '40%', 
                y: '35%',
                descripcion: 'Puerto de embarque principal'
            },
            { 
                nombre: 'Hamburgo', 
                tipo: 'cliente', 
                x: '70%', 
                y: '25%',
                descripcion: 'Cliente estratégico en Alemania'
            },
            { 
                nombre: 'París', 
                tipo: 'cliente', 
                x: '65%', 
                y: '30%',
                descripcion: 'Cliente estratégico en Francia'
            }
        ];
        
        // Crear contenedor para puntos
        const puntosContainer = document.createElement('div');
        puntosContainer.className = 'puntos-mapa';
        puntosContainer.style.position = 'absolute';
        puntosContainer.style.top = '0';
        puntosContainer.style.left = '0';
        puntosContainer.style.width = '100%';
        puntosContainer.style.height = '100%';
        mapaImagen.parentElement.style.position = 'relative';
        mapaImagen.parentElement.appendChild(puntosContainer);
        
        // Crear puntos en el mapa
        puntosInteractivos.forEach(punto => {
            const puntoElement = document.createElement('div');
            puntoElement.className = `mapa-punto punto-${punto.tipo}`;
            puntoElement.style.position = 'absolute';
            puntoElement.style.left = punto.x;
            puntoElement.style.top = punto.y;
            puntoElement.style.width = '20px';
            puntoElement.style.height = '20px';
            puntoElement.style.borderRadius = '50%';
            puntoElement.style.cursor = 'pointer';
            puntoElement.style.zIndex = '10';
            
            // Colores según tipo
            if (punto.tipo === 'proveedor') {
                puntoElement.style.background = '#38a169';
                puntoElement.style.boxShadow = '0 0 0 4px rgba(56, 161, 105, 0.3)';
            } else if (punto.tipo === 'planta') {
                puntoElement.style.background = '#3182ce';
                puntoElement.style.boxShadow = '0 0 0 4px rgba(49, 130, 206, 0.3)';
            } else if (punto.tipo === 'puerto') {
                puntoElement.style.background = '#d69e2e';
                puntoElement.style.boxShadow = '0 0 0 4px rgba(214, 158, 46, 0.3)';
            } else if (punto.tipo === 'cliente') {
                puntoElement.style.background = '#e53e3e';
                puntoElement.style.boxShadow = '0 0 0 4px rgba(229, 62, 62, 0.3)';
            }
            
            // Tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'mapa-tooltip';
            tooltip.innerHTML = `
                <strong>${punto.nombre}</strong><br>
                <small>${punto.descripcion}</small>
            `;
            tooltip.style.position = 'absolute';
            tooltip.style.bottom = '25px';
            tooltip.style.left = '50%';
            tooltip.style.transform = 'translateX(-50%)';
            tooltip.style.background = 'rgba(26, 54, 93, 0.95)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '8px 12px';
            tooltip.style.borderRadius = '8px';
            tooltip.style.fontSize = '0.8rem';
            tooltip.style.whiteSpace = 'nowrap';
            tooltip.style.display = 'none';
            tooltip.style.zIndex = '100';
            tooltip.style.backdropFilter = 'blur(10px)';
            tooltip.style.border = '1px solid rgba(255, 255, 255, 0.2)';
            
            // Flecha del tooltip
            const tooltipArrow = document.createElement('div');
            tooltipArrow.style.position = 'absolute';
            tooltipArrow.style.bottom = '-6px';
            tooltipArrow.style.left = '50%';
            tooltipArrow.style.transform = 'translateX(-50%)';
            tooltipArrow.style.width = '0';
            tooltipArrow.style.height = '0';
            tooltipArrow.style.borderLeft = '6px solid transparent';
            tooltipArrow.style.borderRight = '6px solid transparent';
            tooltipArrow.style.borderTop = '6px solid rgba(26, 54, 93, 0.95)';
            
            tooltip.appendChild(tooltipArrow);
            puntoElement.appendChild(tooltip);
            
            // Eventos
            puntoElement.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.5)';
                this.style.zIndex = '100';
                tooltip.style.display = 'block';
                
                // Animar tooltip
                tooltip.style.animation = 'fadeInUp 0.3s ease forwards';
            });
            
            puntoElement.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.zIndex = '10';
                tooltip.style.display = 'none';
            });
            
            puntosContainer.appendChild(puntoElement);
        });
        
        // Interactividad con leyenda
        leyendaItems.forEach(item => {
            item.addEventListener('click', function() {
                const tipo = this.querySelector('.leyenda-color').classList[1] || 
                            this.querySelector('.leyenda-linea').classList[1];
                
                // Destacar puntos del tipo seleccionado
                const puntos = document.querySelectorAll(`.punto-${tipo}`);
                puntos.forEach(punto => {
                    punto.style.animation = 'pulse-glow 1s 3';
                });
                
                // Destacar leyenda
                this.style.transform = 'scale(1.05)';
                this.style.transition = 'transform 0.3s ease';
                
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 1000);
            });
        });
    }
    
    // ============================================
    // 3. KPIs INTERACTIVOS
    // ============================================
    
    function initKPIsInteractivos() {
        const kpiRows = document.querySelectorAll('.kpi-row');
        
        // Animar barras de progreso al hacer scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progreso = entry.target.querySelector('.progreso-relleno');
                    if (progreso) {
                        // Obtener el ancho del progreso desde el estilo inline
                        const width = progreso.style.width;
                        // Reiniciar animación
                        progreso.style.width = '0%';
                        setTimeout(() => {
                            progreso.style.transition = 'width 1.5s ease-in-out';
                            progreso.style.width = width;
                        }, 300);
                    }
                    
                    // Añadir clase de destacado temporalmente
                    entry.target.classList.add('kpi-destacado');
                    setTimeout(() => {
                        entry.target.classList.remove('kpi-destacado');
                    }, 2000);
                }
            });
        }, {
            threshold: 0.5
        });
        
        kpiRows.forEach(row => observer.observe(row));
        
        // Click para ver detalles
        kpiRows.forEach(row => {
            row.addEventListener('click', function() {
                // Alternar detalles expandidos
                this.classList.toggle('kpi-expandido');
                
                if (this.classList.contains('kpi-expandido')) {
                    // Crear detalles expandidos
                    const detalles = document.createElement('div');
                    detalles.className = 'kpi-detalles';
                    detalles.innerHTML = `
                        <div class="detalles-contenido">
                            <h4><i class="fas fa-chart-line"></i> Detalles del Indicador</h4>
                            <div class="detalles-info">
                                <p><strong>Fórmula:</strong> (Entregas a tiempo / Total entregas) × 100</p>
                                <p><strong>Frecuencia:</strong> Mensual</p>
                                <p><strong>Responsable:</strong> Director Logístico</p>
                                <p><strong>Última actualización:</strong> ${new Date().toLocaleDateString()}</p>
                            </div>
                            <button class="cerrar-detalles">
                                <i class="fas fa-times"></i> Cerrar
                            </button>
                        </div>
                    `;
                    
                    this.appendChild(detalles);
                    
                    // Botón cerrar
                    detalles.querySelector('.cerrar-detalles').addEventListener('click', function(e) {
                        e.stopPropagation();
                        detalles.remove();
                        row.classList.remove('kpi-expandido');
                    });
                } else {
                    // Remover detalles si existen
                    const detalles = this.querySelector('.kpi-detalles');
                    if (detalles) detalles.remove();
                }
            });
        });
    }
    
    // ============================================
    // 4. RUTAS INTERACTIVAS
    // ============================================
    
    function initRutasInteractivas() {
        const rutaCards = document.querySelectorAll('.ruta-card');
        const rutasGrid = document.querySelector('.rutas-grid');
        
        // Sistema de filtrado por tipo de ruta
        const filtrosRutas = document.createElement('div');
        filtrosRutas.className = 'filtros-rutas';
        filtrosRutas.innerHTML = `
            <div class="filtros-titulo">
                <i class="fas fa-filter"></i>
                <span>Filtrar rutas:</span>
            </div>
            <div class="filtros-botones">
                <button class="filtro-btn activo" data-filtro="todas">
                    <i class="fas fa-globe-americas"></i> Todas
                </button>
                <button class="filtro-btn" data-filtro="maritima">
                    <i class="fas fa-ship"></i> Marítimas
                </button>
                <button class="filtro-btn" data-filtro="aerea">
                    <i class="fas fa-plane"></i> Aéreas
                </button>
                <button class="filtro-btn" data-filtro="multimodal">
                    <i class="fas fa-exchange-alt"></i> Multimodales
                </button>
            </div>
        `;
        
        // Insertar filtros antes de las rutas
        rutasGrid.parentElement.insertBefore(filtrosRutas, rutasGrid);
        
        // Aplicar filtros
        const filtroBtns = filtrosRutas.querySelectorAll('.filtro-btn');
        filtroBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remover clase activa de todos
                filtroBtns.forEach(b => b.classList.remove('activo'));
                // Añadir al botón clickeado
                this.classList.add('activo');
                
                const filtro = this.dataset.filtro;
                
                // Filtrar rutas
                rutaCards.forEach(card => {
                    if (filtro === 'todas') {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        const esMaritima = card.querySelector('.fa-ship');
                        const esAerea = card.querySelector('.fa-plane');
                        const esMultimodal = card.querySelector('.fa-exchange-alt');
                        
                        let mostrar = false;
                        if (filtro === 'maritima' && esMaritima) mostrar = true;
                        if (filtro === 'aerea' && esAerea) mostrar = true;
                        if (filtro === 'multimodal' && esMultimodal) mostrar = true;
                        
                        if (mostrar) {
                            card.style.display = 'flex';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, 50);
                        } else {
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(20px)';
                            setTimeout(() => {
                                card.style.display = 'none';
                            }, 300);
                        }
                    }
                });
                
                // Animar aparición
                rutaCards.forEach((card, index) => {
                    if (card.style.display !== 'none') {
                        card.style.transitionDelay = `${index * 0.1}s`;
                    }
                });
            });
        });
        
        // Animación de destinos
        rutaCards.forEach(card => {
            const destinoFlecha = card.querySelector('.destino-flecha');
            if (destinoFlecha) {
                setInterval(() => {
                    destinoFlecha.style.transform = 'translateX(5px)';
                    setTimeout(() => {
                        destinoFlecha.style.transform = 'translateX(0)';
                    }, 500);
                }, 3000);
            }
            
            // Efecto de hover para mostrar tiempo estimado
            card.addEventListener('mouseenter', function() {
                const tipo = this.querySelector('.ruta-icono i').className;
                let tiempo = '';
                
                if (tipo.includes('ship')) tiempo = '15-25 días';
                if (tipo.includes('plane')) tiempo = '2-5 días';
                if (tipo.includes('exchange-alt')) tiempo = 'Variable';
                
                const tiempoElement = document.createElement('div');
                tiempoElement.className = 'tiempo-ruta';
                tiempoElement.innerHTML = `<i class="fas fa-clock"></i> <strong>Tiempo estimado:</strong> ${tiempo}`;
                tiempoElement.style.position = 'absolute';
                tiempoElement.style.top = '10px';
                tiempoElement.style.right = '10px';
                tiempoElement.style.background = 'var(--accent-red)';
                tiempoElement.style.color = 'white';
                tiempoElement.style.padding = '5px 10px';
                tiempoElement.style.borderRadius = '20px';
                tiempoElement.style.fontSize = '0.8rem';
                tiempoElement.style.zIndex = '5';
                
                this.appendChild(tiempoElement);
            });
            
            card.addEventListener('mouseleave', function() {
                const tiempoElement = this.querySelector('.tiempo-ruta');
                if (tiempoElement) tiempoElement.remove();
            });
        });
    }
    
    // ============================================
    // 5. ESTRATEGIA INTERACTIVA
    // ============================================
    
    function initEstrategiaInteractiva() {
        const opciones = document.querySelectorAll('.opcion');
        const clienteItems = document.querySelectorAll('.cliente-item');
        
        // Mostrar ruta al pasar sobre opción
        opciones.forEach(opcion => {
            opcion.addEventListener('mouseenter', function() {
                const tipo = this.classList.contains('opcion-directa') ? 'directa' : 'indirecta';
                
                // Resaltar clientes correspondientes
                clienteItems.forEach(item => {
                    const texto = item.textContent.trim();
                    if (tipo === 'directa' && ['Alemania', 'Francia'].includes(texto)) {
                        item.style.background = 'var(--success-green)';
                        item.style.color = 'white';
                        item.style.transform = 'scale(1.1)';
                    } else if (tipo === 'indirecta' && ['Polonia', 'Más mercados'].includes(texto)) {
                        item.style.background = 'var(--warning-yellow)';
                        item.style.color = 'white';
                        item.style.transform = 'scale(1.1)';
                    }
                });
            });
            
            opcion.addEventListener('mouseleave', function() {
                clienteItems.forEach(item => {
                    item.style.background = '';
                    item.style.color = '';
                    item.style.transform = '';
                });
            });
        });
        
        // Animación de flujo
        const flechas = document.querySelectorAll('.opcion-flecha');
        setInterval(() => {
            flechas.forEach(flecha => {
                flecha.style.transform = 'translateY(5px)';
                setTimeout(() => {
                    flecha.style.transform = 'translateY(0)';
                }, 500);
            });
        }, 2000);
    }
    
    // ============================================
    // 6. CROSSDOCKING INTERACTIVO
    // ============================================
    
    function initCrossdockingInteractivo() {
        const tipoCards = document.querySelectorAll('.tipo-card');
        const flujos = document.querySelectorAll('.flujo-simple, .flujo-complejo');
        
        // Animación de flujo paso a paso
        tipoCards.forEach((card, index) => {
            card.addEventListener('mouseenter', function() {
                const flujo = this.querySelector('.flujo-simple, .flujo-complejo');
                if (!flujo) return;
                
                const etapas = flujo.querySelectorAll('.flujo-etapa');
                etapas.forEach((etapa, i) => {
                    setTimeout(() => {
                        etapa.style.background = 'var(--primary-blue)';
                        etapa.style.color = 'white';
                        etapa.querySelector('i').style.color = 'white';
                        
                        // Restaurar después de un tiempo
                        setTimeout(() => {
                            etapa.style.background = '';
                            etapa.style.color = '';
                            etapa.querySelector('i').style.color = '';
                        }, 1000);
                    }, i * 300);
                });
            });
        });
        
        // Simulación de tiempo de proceso
        tipoCards.forEach(card => {
            const tiempoBtn = document.createElement('button');
            tiempoBtn.className = 'simular-tiempo-btn';
            tiempoBtn.innerHTML = '<i class="fas fa-stopwatch"></i> Simular proceso';
            tiempoBtn.style.marginTop = '1rem';
            tiempoBtn.style.padding = '0.5rem 1rem';
            tiempoBtn.style.background = 'var(--tech-cyan)';
            tiempoBtn.style.color = 'white';
            tiempoBtn.style.border = 'none';
            tiempoBtn.style.borderRadius = '20px';
            tiempoBtn.style.cursor = 'pointer';
            tiempoBtn.style.fontSize = '0.9rem';
            tiempoBtn.style.transition = 'all 0.3s ease';
            
            tiempoBtn.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
            });
            
            tiempoBtn.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
            
            tiempoBtn.addEventListener('click', function() {
                const tipo = card.querySelector('.tipo-header h3').textContent;
                let tiempo = '';
                
                if (tipo.includes('Directo')) tiempo = '2-4 horas';
                if (tipo.includes('Consolidación')) tiempo = '6-12 horas';
                
                // Mostrar tiempo
                const tiempoDisplay = document.createElement('div');
                tiempoDisplay.className = 'tiempo-proceso';
                tiempoDisplay.innerHTML = `
                    <div class="tiempo-contenido">
                        <i class="fas fa-clock"></i>
                        <h4>Tiempo estimado de proceso:</h4>
                        <div class="tiempo-valor">${tiempo}</div>
                        <small>Basado en carga estándar</small>
                    </div>
                `;
                tiempoDisplay.style.position = 'fixed';
                tiempoDisplay.style.bottom = '20px';
                tiempoDisplay.style.right = '20px';
                tiempoDisplay.style.background = 'var(--primary-blue)';
                tiempoDisplay.style.color = 'white';
                tiempoDisplay.style.padding = '1rem';
                tiempoDisplay.style.borderRadius = 'var(--border-radius)';
                tiempoDisplay.style.zIndex = '1000';
                tiempoDisplay.style.boxShadow = 'var(--shadow-lg)';
                tiempoDisplay.style.animation = 'slideInUp 0.3s ease';
                
                document.body.appendChild(tiempoDisplay);
                
                // Auto-remover después de 3 segundos
                setTimeout(() => {
                    tiempoDisplay.style.animation = 'slideOutDown 0.3s ease';
                    setTimeout(() => {
                        tiempoDisplay.remove();
                    }, 300);
                }, 3000);
            });
            
            card.querySelector('.tipo-flujo').appendChild(tiempoBtn);
        });
    }
    
    // ============================================
    // 7. SCROLL SUAVE Y SECCIONES
    // ============================================
    
    function initScrollNavegacion() {
        // Navegación por secciones
        const menuLinks = document.querySelectorAll('.nav-links a[href^="#"]');
        const secciones = document.querySelectorAll('section[id]');
        
        menuLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    // Cerrar submenús si están abiertos
                    document.querySelectorAll('.has-submenu.submenu-open').forEach(item => {
                        item.classList.remove('submenu-open');
                        const submenu = item.querySelector('.submenu');
                        if (submenu) submenu.style.display = 'none';
                    });
                    
                    // Scroll suave
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Resaltar sección temporalmente
                    targetSection.style.boxShadow = '0 0 0 4px rgba(229, 62, 62, 0.3)';
                    setTimeout(() => {
                        targetSection.style.boxShadow = '';
                    }, 1500);
                }
            });
        });
        
        // Resaltar sección activa al hacer scroll
        function highlightActiveSection() {
            let scrollPos = window.scrollY + 100;
            
            secciones.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    // Remover clase activa de todos los enlaces
                    menuLinks.forEach(link => link.classList.remove('active'));
                    
                    // Añadir clase activa al enlace correspondiente
                    const correspondingLink = document.querySelector(`.nav-links a[href="#${section.id}"]`);
                    if (correspondingLink) {
                        correspondingLink.classList.add('active');
                    }
                }
            });
        }
        
        window.addEventListener('scroll', highlightActiveSection);
        highlightActiveSection(); // Ejecutar al cargar
    }
    
    // ============================================
    // 8. ANIMACIONES CSS DINÁMICAS
    // ============================================
    
    function injectDynamicStyles() {
        const styles = `
            /* Animaciones para nodos */
            .nodo-visible {
                opacity: 1 !important;
            }
            
            .nodo-expandido .nodo-contenido {
                transform: scale(1.02) !important;
                box-shadow: var(--shadow-lg) !important;
                border-left-color: var(--accent-red) !important;
            }
            
            .nodo-hover {
                z-index: 10 !important;
            }
            
            /* Animaciones para KPIs */
            .kpi-destacado {
                background: rgba(56, 161, 105, 0.1) !important;
            }
            
            .kpi-expandido {
                background: #f8fafc !important;
                border-left: 4px solid var(--accent-red) !important;
            }
            
            .kpi-detalles {
                grid-column: 1 / -1;
                padding: 1.5rem;
                background: white;
                border-top: 1px solid #e2e8f0;
                animation: fadeIn 0.3s ease;
            }
            
            .detalles-contenido {
                max-width: 600px;
                margin: 0 auto;
            }
            
            .detalles-contenido h4 {
                color: var(--primary-blue);
                margin-bottom: 1rem;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .detalles-info {
                background: var(--light-bg);
                padding: 1rem;
                border-radius: var(--border-radius);
                margin-bottom: 1rem;
            }
            
            .detalles-info p {
                margin-bottom: 0.5rem;
                color: var(--text-dark);
            }
            
            .cerrar-detalles {
                background: var(--accent-red);
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 20px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 5px;
                margin: 0 auto;
            }
            
            /* Animaciones para filtros */
            .filtros-rutas {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 2rem;
                padding: 1rem 1.5rem;
                background: var(--light-bg);
                border-radius: var(--border-radius);
                flex-wrap: wrap;
                gap: 1rem;
            }
            
            .filtros-titulo {
                display: flex;
                align-items: center;
                gap: 10px;
                font-weight: 600;
                color: var(--primary-blue);
            }
            
            .filtros-botones {
                display: flex;
                gap: 0.5rem;
                flex-wrap: wrap;
            }
            
            .filtro-btn {
                padding: 0.5rem 1rem;
                background: white;
                border: 2px solid #e2e8f0;
                border-radius: 20px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 5px;
                font-size: 0.9rem;
                transition: all 0.3s ease;
            }
            
            .filtro-btn:hover {
                border-color: var(--primary-blue);
                transform: translateY(-2px);
            }
            
            .filtro-btn.activo {
                background: var(--primary-blue);
                color: white;
                border-color: var(--primary-blue);
            }
            
            /* Animaciones generales */
            @keyframes bounceIn {
                0% { transform: scale(0.5); opacity: 0; }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); opacity: 1; }
            }
            
            @keyframes slideInRight {
                0% { transform: translateX(-20px); opacity: 0; }
                100% { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes fadeInUp {
                0% { transform: translateY(10px) translateX(-50%); opacity: 0; }
                100% { transform: translateY(0) translateX(-50%); opacity: 1; }
            }
            
            @keyframes slideInUp {
                0% { transform: translateY(20px); opacity: 0; }
                100% { transform: translateY(0); opacity: 1; }
            }
            
            @keyframes slideOutDown {
                0% { transform: translateY(0); opacity: 1; }
                100% { transform: translateY(20px); opacity: 0; }
            }
            
            /* Transiciones para rutas */
            .ruta-card {
                transition: opacity 0.3s ease, transform 0.3s ease !important;
            }
            
            /* Efectos para mapa */
            .mapa-punto {
                transition: all 0.3s ease;
            }
            
            .mapa-tooltip {
                pointer-events: none;
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
    
    // ============================================
    // 9. INICIALIZACIÓN COMPLETA
    // ============================================
    
    function initCadenaSuministros() {
        console.log('🚀 Inicializando interactividad de Cadena de Suministros');
        
        // Inyectar estilos dinámicos primero
        injectDynamicStyles();
        
        // Inicializar todas las funcionalidades
        initNodosAnimacion();
        initMapaInteractivo();
        initKPIsInteractivos();
        initRutasInteractivas();
        initEstrategiaInteractiva();
        initCrossdockingInteractivo();
        initScrollNavegacion();
        
        // Añadir botón de "Volver arriba"
        addBackToTopButton();
        
        // Añadir indicador de progreso de scroll
        addScrollProgress();
        
        console.log('✅ Interactividad de Cadena de Suministros inicializada');
    }
    
    // ============================================
    // 10. FUNCIONALIDADES ADICIONALES
    // ============================================
    
    function addBackToTopButton() {
        const button = document.createElement('button');
        button.className = 'back-to-top';
        button.innerHTML = '<i class="fas fa-chevron-up"></i>';
        button.style.position = 'fixed';
        button.style.bottom = '20px';
        button.style.right = '20px';
        button.style.width = '50px';
        button.style.height = '50px';
        button.style.background = 'var(--accent-red)';
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.borderRadius = '50%';
        button.style.cursor = 'pointer';
        button.style.zIndex = '999';
        button.style.boxShadow = 'var(--shadow-lg)';
        button.style.display = 'none';
        button.style.transition = 'all 0.3s ease';
        
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        button.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        document.body.appendChild(button);
        
        // Mostrar/ocultar basado en scroll
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                button.style.display = 'flex';
                button.style.alignItems = 'center';
                button.style.justifyContent = 'center';
                button.style.animation = 'fadeInUp 0.3s ease';
            } else {
                button.style.display = 'none';
            }
        });
    }
    
    function addScrollProgress() {
        const progress = document.createElement('div');
        progress.className = 'scroll-progress';
        progress.style.position = 'fixed';
        progress.style.top = '0';
        progress.style.left = '0';
        progress.style.width = '0%';
        progress.style.height = '3px';
        progress.style.background = 'linear-gradient(90deg, var(--accent-red), var(--tech-purple))';
        progress.style.zIndex = '1001';
        progress.style.transition = 'width 0.1s ease';
        
        document.body.appendChild(progress);
        
        window.addEventListener('scroll', function() {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progress.style.width = scrolled + '%';
        });
    }
    
    // ============================================
    // 11. MANEJO DE ERRORES Y COMPATIBILIDAD
    // ============================================
    
    function initErrorHandling() {
        // Verificar que las funcionalidades estén disponibles
        if (typeof IntersectionObserver === 'undefined') {
            console.warn('IntersectionObserver no soportado, usando fallback');
            // Fallback: Mostrar todo inmediatamente
            document.querySelectorAll('.nodo-card').forEach(card => {
                card.style.opacity = '1';
            });
        }
        
        // Detectar si estamos en un dispositivo táctil
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints;
        if (isTouchDevice) {
            document.body.classList.add('touch-device');
            console.log('📱 Dispositivo táctil detectado');
        }
        
        // Manejar errores silenciosamente
        window.addEventListener('error', function(e) {
            console.error('Error en Cadena de Suministros:', e.error);
            // No mostrar alertas al usuario
        });
    }
    
    // ============================================
    // 12. INICIALIZAR TODO
    // ============================================
    
    // Esperar a que la página esté completamente cargada
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initErrorHandling();
            initCadenaSuministros();
        });
    } else {
        initErrorHandling();
        initCadenaSuministros();
    }
    
    // Exportar funciones para uso global (si es necesario)
    window.CadenaSuministros = {
        reiniciarAnimaciones: function() {
            document.querySelectorAll('.nodo-card').forEach(card => {
                card.classList.remove('nodo-visible');
            });
            setTimeout(initCadenaSuministros, 100);
        },
        destacarNodo: function(numero) {
            const nodo = document.querySelector(`.nodo-card[data-nodo="${numero}"]`);
            if (nodo) {
                nodo.style.animation = 'pulse-glow 2s 3';
                nodo.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        },
        simularRuta: function(tipo) {
            const ruta = document.querySelector(`.ruta-card:nth-child(${tipo})`);
            if (ruta) {
                ruta.style.animation = 'pulse-glow 2s 3';
                setTimeout(() => {
                    ruta.style.animation = '';
                }, 2000);
            }
        }
    };
});

// ============================================
// FUNCIONES GLOBALES DE UTILIDAD
// ============================================

/**
 * Formatea un número como porcentaje
 */
function formatPorcentaje(valor) {
    return `${Math.round(valor)}%`;
}

/**
 * Calcula el tiempo estimado de entrega
 */
function calcularTiempoEntrega(origen, destino, tipoTransporte) {
    const tiempos = {
        'maritimo': {
            'mexico-alemania': '15-25 días',
            'mexico-francia': '18-28 días',
            'mexico-polonia': '20-30 días'
        },
        'aereo': {
            'mexico-alemania': '2-5 días',
            'mexico-francia': '2-5 días',
            'mexico-polonia': '3-6 días'
        }
    };
    
    const clave = `${origen}-${destino}`.toLowerCase();
    return tiempos[tipoTransporte]?.[clave] || 'Variable';
}

/**
 * Obtiene el color correspondiente a un porcentaje KPI
 */
function getColorKPI(porcentaje) {
    if (porcentaje >= 90) return '#38a169'; // Verde
    if (porcentaje >= 70) return '#d69e2e'; // Amarillo
    return '#e53e3e'; // Rojo
}

/**
 * Animación de conteo para estadísticas
 */
function animateCount(element, finalValue, duration = 2000) {
    const startValue = 0;
    const increment = finalValue / (duration / 16); // 60fps
    let current = startValue;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= finalValue) {
            element.textContent = finalValue;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ============================================
// POLYFILLS PARA COMPATIBILIDAD
// ============================================

// Polyfill para IntersectionObserver si es necesario
if (!('IntersectionObserver' in window)) {
    console.log('⚠️ IntersectionObserver no soportado, cargando polyfill...');
    // Aquí podrías cargar un polyfill o usar un fallback
}

// Polyfill para requestAnimationFrame
if (!('requestAnimationFrame' in window)) {
    window.requestAnimationFrame = function(callback) {
        return setTimeout(callback, 16);
    };
    window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
}

console.log('📦 JS de Cadena de Suministros cargado');