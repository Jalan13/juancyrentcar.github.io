document.addEventListener("DOMContentLoaded", () => {
    // Siempre leer del localStorage al iniciar
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    console.log("Carrito desde localStorage:", carrito);
    
    // Resto del código...

    const contenedorProductos = document.querySelector(".carrito-productos");
    const carritoVacio = document.querySelector(".carrito-vacio");
    const carritoAcciones = document.getElementById("carrito-acciones");
    const totalElement = document.getElementById("total");
    const comprado = document.getElementById("carrito-comprado");

 

    function mostrarCarrito() {
        contenedorProductos.innerHTML = "";
        if (carrito.length === 0) {
            carritoVacio.classList.remove("disabled");
            carritoAcciones.classList.add("disabled");
            comprado.classList.add("disabled");
            return;
        }

        carritoVacio.classList.add("disabled");
        carritoAcciones.classList.remove("disabled");

        carrito.forEach((producto, index) => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");

            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Días</small>
                    <input type="number" class="input-dias" data-index="${index}" min="1" value="${producto.dias || 1}">
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio por día</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${(producto.precio * (producto.dias || 1)).toFixed(2)}</p>
                </div>
                <button class="carrito-producto-eliminar" data-id="${producto.id}">
                    <i class="bi bi-trash-fill"></i>
                </button>
            `;

            contenedorProductos.append(div);
        });

        actualizarEventos();
        actualizarTotal();
    }

    function actualizarEventos() {
        // eliminar producto
        document.querySelectorAll(".carrito-producto-eliminar").forEach(btn => {
            btn.addEventListener("click", e => {
                const id = e.currentTarget.dataset.id;
                carrito = carrito.filter(p => p.id != id);
                localStorage.setItem("carrito", JSON.stringify(carrito));
                mostrarCarrito();
            });
        });

        // cambio en días
        document.querySelectorAll(".input-dias").forEach(input => {
            input.addEventListener("input", e => {
                const index = e.target.dataset.index;
                const valor = parseInt(e.target.value);
                carrito[index].dias = valor > 0 ? valor : 1;
                localStorage.setItem("carrito", JSON.stringify(carrito));
                mostrarCarrito();
            });
        });
    }

    function actualizarTotal() {
        const total = carrito.reduce((acc, item) => {
            const dias = item.dias || 1;
            return acc + item.precio * dias;
        }, 0);
        totalElement.textContent = `$${total.toFixed(2)}`;
    }

    // Vaciar carrito
    document.getElementById("carrito-acciones-vaciar").addEventListener("click", () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Se eliminarán todos los productos del carrito",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, vaciar carrito'
        }).then((result) => {
            if (result.isConfirmed) {
                carrito = [];
                localStorage.setItem("carrito", JSON.stringify(carrito));
                mostrarCarrito();
                Swal.fire('Carrito vaciado', '', 'success');
            }
        });
    });

    // Comprar ahora
    document.getElementById("carrito-acciones-comprar").addEventListener("click", () => {
        if (carrito.length === 0) return;

        let resumen = carrito.map(p => {
            return `${p.titulo} - ${p.dias || 1} día(s) - $${(p.precio * (p.dias || 1)).toFixed(2)}`
        }).join('\n');

        Swal.fire({
            title: 'Confirmar reserva',
            text: `¿Deseas completar esta reservación?\n\n${resumen}`,
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Sí, confirmar',
            cancelButtonText: 'Cancelar'
        }).then(result => {
            if (result.isConfirmed) {
                carrito = [];
                localStorage.setItem("carrito", JSON.stringify(carrito));
                mostrarCarrito();
                comprado.classList.remove("disabled");
            }
        });
    });

    mostrarCarrito();
});
