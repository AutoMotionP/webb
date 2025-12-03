// Datos de los productos - ACTUALIZADO
const productosData = {
    arnes: {
        titulo: "ARNÉS AUTOMOTRIZ",
        descripcion: "Sistemas de cableado premium para distribución de energía y señales en vehículos ligeros, SUVs y comerciales",
        imagen: "img/arnes.jpg",
        especificaciones: [
            { titulo: "Material del conductor", descripcion: "Cobre automotriz de alta pureza", icono: "fas fa-bolt" },
            { titulo: "Aislamiento", descripcion: "PVC automotriz, resistente hasta 105°C", icono: "fas fa-shield-alt" },
            { titulo: "Longitud estándar", descripcion: "1.5 m - 2.0 m personalizable", icono: "fas fa-ruler" },
            { titulo: "Temperatura de operación", descripcion: "-40 °C a 120 °C", icono: "fas fa-thermometer-half" },
            { titulo: "Protección", descripcion: "Enfundado corrugado + cinta textil", icono: "fas fa-hard-hat" },
            { titulo: "Conectores", descripcion: "Termoplásticos OEM certificados", icono: "fas fa-plug" },
            { titulo: "Resistencia dieléctrica", descripcion: "> 1,500 V", icono: "fas fa-bolt" },
            { titulo: "Vida útil estimada", descripcion: "> 10 años o 150,000 km", icono: "fas fa-calendar-check" }
        ],
        aplicaciones: [
            { titulo: "Autos Ligeros", descripcion: "Sistemas completos de cableado para sedanes y hatchbacks" },
            { titulo: "SUVs", descripcion: "Soluciones robustas para terrenos variados y condiciones extremas" },
            { titulo: "Vehículos Comerciales", descripcion: "Arneses de alta durabilidad para flotas comerciales" }
        ]
    },
    sensor: {
        titulo: "SENSOR ABS",
        descripcion: "Sensores de velocidad de rueda de alta precisión para sistemas de frenado antibloqueo en vehículos modernos",
        imagen: "img/sensorabs.jpeg",
        especificaciones: [
            { titulo: "Tipo de sensor", descripcion: "Inductivo o activo según aplicación", icono: "fas fa-wave-square" },
            { titulo: "Carcasa", descripcion: "Plástico automotriz, grado IP67", icono: "fas fa-cube" },
            { titulo: "Longitud del cable", descripcion: "45 - 70 cm estándar", icono: "fas fa-ruler" },
            { titulo: "Voltaje de Operación", descripcion: "4.5 - 12 V DC", icono: "fas fa-battery-half" },
            { titulo: "Temperatura de Operación", descripcion: "-40 °C a 150 °C", icono: "fas fa-thermometer-full" },
            { titulo: "Señal de salida", descripcion: "AC (inductivo) o digital (activo)", icono: "fas fa-signal" },
            { titulo: "Conector", descripcion: "2 o 3 pines tipo OEM", icono: "fas fa-plug" },
            { titulo: "Frecuencia / Señal", descripcion: "Variable según RPM del vehículo", icono: "fas fa-tachometer-alt" }
        ],
        aplicaciones: [
            { titulo: "Sistemas ABS", descripcion: "Detección precisa de velocidad de rueda para frenado seguro" },
            { titulo: "Control de tracción", descripcion: "Monitoreo continuo para optimización de adherencia" },
            { titulo: "Frenado de emergencia", descripcion: "Respuesta inmediata en situaciones críticas" }
        ]
    },
    motor: {
        titulo: "MÓDULO ELECTRÓNICO",
        descripcion: "Unidades de control electrónico avanzadas para gestión de sistemas vehiculares con tecnología de punta",
        imagen: "img/modulo.jpg",
        especificaciones: [
            { titulo: "Procesador", descripcion: "Microcontrolador 32-bit automotriz", icono: "fas fa-microchip" },
            { titulo: "Memoria", descripcion: "EEPROM + Flash interna expandible", icono: "fas fa-memory" },
            { titulo: "Voltaje de Operación", descripcion: "12 V DC con protección contra picos", icono: "fas fa-bolt" },
            { titulo: "Carcasa", descripcion: "Aluminio resistente a vibraciones y corrosión", icono: "fas fa-shield-alt" },
            { titulo: "Temperatura de operación", descripcion: "-40 °C a 125 °C", icono: "fas fa-thermometer-three-quarters" },
            { titulo: "Conectores", descripcion: "24 a 64 pines según modelo y aplicación", icono: "fas fa-network-wired" },
            { titulo: "Protección", descripcion: "Alta resistencia a vibraciones, humedad y EMI", icono: "fas fa-hard-hat" },
            { titulo: "Vida útil estimada", descripcion: "Soporta > 150,000 km de operación continua", icono: "fas fa-road" }
        ],
        aplicaciones: [
            { titulo: "Vehículos Eléctricos", descripcion: "Control de propulsión principal y sistemas de energía" },
            { titulo: "Híbridos", descripcion: "Gestión de sistemas de asistencia y transición potencia" },
            { titulo: "Autobuses Urbanos", descripcion: "Control integral para transporte público eléctrico" }
        ]
    }
};

// Función para cargar el contenido del producto - MEJORADA
function cargarProducto(productoId) {
    const producto = productosData[productoId];
    const contenido = document.getElementById('contenido-producto');
    
    contenido.innerHTML = `
        <section class="producto-detalle">
            <div class="container">
                <!-- Hero del Producto -->
                <div class="hero-producto">
                    <h2><i class="fas fa-star"></i> ${producto.titulo}</h2>
                    <p>${producto.descripcion}</p>
                </div>

                <!-- Imagen del Producto -->
                <div class="imagen-producto-container">
                    <img src="${producto.imagen}" alt="${producto.titulo}" class="imagen-producto">
                </div>

                <!-- Especificaciones Técnicas -->
                <h2 style="text-align: center; margin-bottom: 3rem; color: var(--primary-blue);">
                    <i class="fas fa-clipboard-list"></i> Especificaciones Técnicas
                </h2>
                <div class="especificaciones-grid">
                    ${producto.especificaciones.map(espec => `
                        <div class="espec-card">
                            <h3><i class="${espec.icono}"></i> ${espec.titulo}</h3>
                            <p>${espec.descripcion}</p>
                        </div>
                    `).join('')}
                </div>

                <!-- Aplicaciones -->
                <h2 style="text-align: center; margin-bottom: 3rem; color: var(--primary-blue);">
                    <i class="fas fa-cogs"></i> Aplicaciones Principales
                </h2>
                <div class="aplicaciones-grid">
                    ${producto.aplicaciones.map(apli => `
                        <div class="apli-card">
                            <h3>${apli.titulo}</h3>
                            <p>${apli.descripcion}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <!-- CTA -->
        <section class="producto-cta">
            <div class="container">
                <h2>¿Interesado en nuestros ${producto.titulo.toLowerCase()}?</h2>
                <p>Contáctanos para una cotización personalizada y especificaciones detalladas</p>
                <button class="cta-button">Solicitar Cotización <i class="fas fa-arrow-right"></i></button>
            </div>
        </section>
    `;

    // Actualizar estado activo de las cards
    document.querySelectorAll('.selector-card').forEach(card => {
        card.classList.remove('active');
    });
    document.querySelector(`[data-producto="${productoId}"]`).classList.add('active');

    // Aplicar animaciones al nuevo contenido
    aplicarAnimaciones();
}

// Función para aplicar animaciones
function aplicarAnimaciones() {
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

    // Aplicar animación a las especificaciones
    document.querySelectorAll('.espec-card').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    // Aplicar animación a las cards de aplicaciones
    document.querySelectorAll('.apli-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Event Listeners - ACTUALIZADO
document.addEventListener('DOMContentLoaded', function() {
    // Cargar el primer producto por defecto
    cargarProducto('arnes');

    // Event listeners para las cards de productos
    document.querySelectorAll('.selector-card').forEach(card => {
        card.addEventListener('click', function() {
            const productoId = this.getAttribute('data-producto');
            cargarProducto(productoId);
            
            // Scroll suave al contenido
            document.getElementById('contenido-producto').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

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
            header.style.background = '#1a365d';
            header.style.boxShadow = 'none';
        }
    });

    // Función para el botón de cotización
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('cta-button')) {
            alert('Serás redirigido a nuestro formulario de contacto para solicitar una cotización personalizada.');
            // Aquí puedes redirigir al formulario de contacto
            // window.location.href = 'index.html#contacto';
        }
    });
});