// Base de datos de vehículos
const vehiculos = [
    {
        id: 1,
        titulo: "Toyota Highlander 2015",
        imagen: "img/Highlander.jpg",
        precio: 45,
        marca: "toyota",
        caracteristicas: ["Automático", "A/C", "5 Asientos", "GPS"],
        rating: 4.8,
        popular: true,
        combustible: "Gasolina",
        año: 2024,
         galeria: [
    "img/Prueba de interior.jpeg", // Imagen de prueba
    "Video toyota highlander.mp4" // Video de prueba
]
    },
    {
        id: 2,
        titulo: "Honda CR-V 2018",
        imagen: "https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=400",
        precio: 60,
        marca: "honda",
        caracteristicas: ["SUV", "AWD", "5 Asientos", "Cámara"],
        rating: 4.9,
        popular: true,
        combustible: "Gasolina",
        año: 2018
    },
    {
        id: 3,
        titulo: "Honda CR-V 2015",
        imagen: "https://images.pexels.com/photos/2479557/pexels-photo-2479557.jpeg?auto=compress&cs=tinysrgb&w=400",
        precio: 45,
        marca: "honda",
        caracteristicas: ["Sedán", "Premium", "5 Asientos", "Bluetooth"],
        rating: 4.7,
        popular: false,
        combustible: "Gasolina",
        año: 2015
    },
    {
        id: 4,
        titulo: "Honda CR-V 2011",
        imagen: "img/Imagen honda 2011.jpg",
        precio: 35,
        marca: "honda",
        caracteristicas: ["SUV", "5 Asientos", "FWD",],
        rating: 4.2,
        popular: false,
        combustible: "Gasolina",
        año: 2011,
        galeria: [
            "img/Imagen interior crv negra 2011.jpg",
            "Video honda crv 2011 negra.mp4"
        ]
    },
    {
        id: 5,
        titulo: "Honda CR-V 2020",
        imagen: "img/CRV Gris 2020.jpg",
        precio: 60,
        marca: "honda",
        caracteristicas: ["Automático", "GPS", "5 Asientos", "USB"],
        rating: 4.8,
        popular: true,
        combustible: "Gasolina",
        año: 2024,
        galeria: [
           "img/Prueba de interior.jpeg", // Imagen de prueba
           "Video crv gris 2020.mp4" // Video de prueba
]
    },
    {
        id: 6,
        titulo: "Honda CR-V 2019",
        imagen: "img/CRV Gris Nardo 2020.jpg",
        precio: 60,
        marca: "honda",
        caracteristicas: ["SUV", "AWD", "7 Asientos", "Cámara"],
        rating: 4.9,
        popular: true,
        combustible: "Gasolina",
        año: 2019,
        galeria: [
            "Video honda crv gris 2019.mp4"
        ]
    },
    {
        id: 7,
        titulo: "Honda CR-V 2013",
        imagen: "img/Imagen crv gris 2013.jpg",
        precio: 45,
        marca: "honda",
        caracteristicas: ["Sedán", "Premium", "5 Asientos", "Sunroof"],
        rating: 4.8,
        popular: false,
        combustible: "Gasolina",
        año: 2024,
        galeria: [
            "img/Imagen interir crv gris 2013.jpg",
            "Video honda crv gris 2013.mp4"
        ]
    },
    {
        id: 8,
        titulo: "Honda CR-V 2015",
        imagen: "img/Imagen crv blanca 2016.jpg",
        precio: 45,
        marca: "honda",
        caracteristicas: ["SUV", "8 Asientos", "AWD", "Navegación"],
        rating: 4.7,
        popular: false,
        combustible: "Gasolina",
        año: 2024,
        galeria: [
            "img/Imagen interior crv blanca 2016.jpg",
            "Video honda crv blanca 2016.mp4"
        ]
    },
    {
        id: 9,
        titulo: "Hyundai Santa Fe 2015",
        imagen: "img/Santa Fe.jpg",
        precio: 45,
        marca: "hyundai",
        caracteristicas: ["SUV", "5 Asientos", "AWD", "Navegación"],
        rating: 4.7,
        popular: false,
        combustible: "Gasolina",
        año: 2015,
        galeria: [
            "Video hyundai santa fe.mp4"
        ]
    }
];

// Variables globales
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let seccionActual = "inicio";

// Elementos del DOM
const openMenu = document.getElementById('open-menu');
const closeMenu = document.getElementById('close-menu');
const aside = document.querySelector('aside');
const botonesCategoria = document.querySelectorAll('.boton-categoria');
const numerito = document.getElementById('numerito');

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    inicializarApp();
});

openMenu?.addEventListener('click', () => {
    aside.classList.add('aside-visible');
});

closeMenu?.addEventListener('click', () => {
    aside.classList.remove('aside-visible');
});

// Funciones principales
function inicializarApp() {
    actualizarNumerito();
    cargarVehiculos();
    
    // Event listeners para botones de categoría
    botonesCategoria.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const categoria = e.currentTarget.id;
            cambiarSeccion(categoria);
        });
    });
}

function cambiarSeccion(nuevaSeccion) {
    // Ocultar todas las secciones
    document.querySelectorAll('.seccion').forEach(seccion => {
        seccion.classList.remove('active');
    });
    
    // Mostrar la sección seleccionada
    const seccionElemento = document.getElementById(`seccion-${nuevaSeccion}`);
    if (seccionElemento) {
        seccionElemento.classList.add('active');
    }
    
    // Actualizar botones activos
    botonesCategoria.forEach(boton => {
        boton.classList.remove('active');
    });
    
    const botonActivo = document.getElementById(nuevaSeccion);
    if (botonActivo) {
        botonActivo.classList.add('active');
    }
    
    // Cerrar menú móvil
    aside.classList.remove('aside-visible');
    
    // Cargar vehículos según la sección
    if (nuevaSeccion !== 'inicio') {
        cargarVehiculos(nuevaSeccion);
    }
    
    seccionActual = nuevaSeccion;
    
    // Scroll al top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function cargarVehiculos(categoria = 'vehiculos') {
    let vehiculosFiltrados = vehiculos.filter(vehiculo => {
        if (categoria === 'vehiculos') return true;
        return vehiculo.marca.toLowerCase() === categoria.toLowerCase();
    });

    const contenedor = document.getElementById(`contenedor-${categoria}`) || 
                      document.getElementById('contenedor-productos');

    if (!contenedor) {
        console.error('Contenedor no encontrado');
        return;
    }

    contenedor.innerHTML = '';

    vehiculosFiltrados.forEach(vehiculo => {
        const tituloLimpio = vehiculo.titulo.replace(/\s*SSD\/dfa\s*/, '');
        const tieneGaleria = vehiculo.galeria && vehiculo.galeria.length > 0;

        const div = document.createElement('div');
        div.className = 'producto';
   div.innerHTML = `
    ${vehiculo.popular ? '<div class="badge-popular">Popular</div>' : ''}
    <div class="producto-imagen-container">
        <img src="${vehiculo.imagen}" alt="${tituloLimpio}" class="producto-imagen">
    </div>
    <div class="producto-detalles">
        <h3>${tituloLimpio}</h3>
        <p class="producto-precio">$${vehiculo.precio}/día</p>
        <div class="botones-container">
            <button class="producto-agregar" id="${vehiculo.id}">Rentar Ahora</button>
            ${tieneGaleria ? `
                <button class="boton-galeria" data-id="${vehiculo.id}">
                    <i class="bi bi-images"></i> Ver galería
                </button>
            ` : ''}
        </div>
    </div>
`;
        contenedor.appendChild(div);
    });

 actualizarBotonesAgregar();
    inicializarBotonesGaleria(); // Esta línea debe estar presente
}
    


function actualizarBotonesAgregar() {
    const botonesAgregar = document.querySelectorAll('.producto-agregar');
    
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito);
    });
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    // Siempre leer del localStorage primero
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const vehiculoAgregado = vehiculos.find(vehiculo => vehiculo.id == idBoton);

    if (carrito.some(vehiculo => vehiculo.id == idBoton)) {
        carrito.find(vehiculo => vehiculo.id == idBoton).cantidad++;
    } else {
        const vehiculoParaCarrito = {...vehiculoAgregado}; // Crear copia
        vehiculoParaCarrito.cantidad = 1;
        vehiculoParaCarrito.dias = 1;
        carrito.push(vehiculoParaCarrito);
    }

    // Actualizar localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
    
    // Actualizar UI
    actualizarNumerito();
    mostrarNotificacion(`${vehiculoAgregado.titulo} agregado al carrito`);
}


function actualizarNumerito() {
    let nuevoNumerito = carrito.reduce((acc, vehiculo) => acc + vehiculo.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}

function mostrarNotificacion(mensaje) {
    if (typeof Toastify !== 'undefined') {
        Toastify({
            text: mensaje,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(135deg, #dc2626, #991b1b)",
                borderRadius: "12px",
                fontFamily: "Inter, sans-serif"
            }
        }).showToast();
    }
}

// Función global para el botón del hero
window.cambiarSeccion = cambiarSeccion;

// Animaciones de scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animaciones
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.value-card, .contact-item, .producto');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});


function inicializarBotonesGaleria() {
    document.querySelectorAll('.boton-galeria').forEach(boton => {
        boton.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const vehiculo = vehiculos.find(v => v.id == id);
            if (vehiculo && vehiculo.galeria) {
                abrirModalGaleria(vehiculo);
            }
        });
    });
}

function abrirModalGaleria(vehiculo) {
    const modal = document.getElementById('modal-carrusel');
    const modalContent = modal.querySelector('.modal-contenido');
    
    // Verificar si hay galería
    if (!vehiculo.galeria || vehiculo.galeria.length === 0) {
        console.error("No hay elementos en la galería para este vehículo");
        return;
    }

    modalContent.innerHTML = `
        <span class="cerrar-modal">&times;</span>
        <h2 style="text-align: center; margin-bottom: 20px;">${vehiculo.titulo.replace(/\s*SSD\/dfa\s*/, '')}</h2>
        <div class="contenedor-galeria">
            <div class="galeria-modal">
                <!-- Imagen principal -->
                <div class="media-item">
                    <img src="${vehiculo.imagen}" alt="Vista principal">
                    <p class="leyenda-imagen">Vista exterior</p>
                </div>
                <!-- Imágenes/videos adicionales -->
                ${vehiculo.galeria.map((item, index) => `
                    <div class="media-item">
                        ${item.endsWith('.mp4') ? 
                            `<video controls><source src="${item}" type="video/mp4"></video>` : 
                            `<img src="${item}" alt="Vista adicional ${index + 1}">`
                        }
                        <p class="leyenda-imagen">${item.endsWith('.mp4') ? 'Video demostrativo' : 'Vista interior'}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    modal.style.display = "flex";
    
    // Cerrar modal al hacer clic
    modal.querySelector('.cerrar-modal').addEventListener('click', () => {
        modal.style.display = "none";
    });
    
    // Cerrar modal al hacer clic fuera del contenido
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

}



