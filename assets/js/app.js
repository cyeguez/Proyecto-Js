/* ----------------------------------- DOM ---------------------------------- */
const item = document.querySelector('#items')
// const boton = document.querySelectorAll('.card-boton')
const contadorIcono = document.querySelector('#contador')
const fragment = document.createDocumentFragment()
const contenedorCarrito = document.querySelector('#articulos-compra')

/* ----------------------------------- DOM ---------------------------------- */
let carrito

if (sessionStorage.getItem('contProductos')) {
    cuenta = JSON.parse(sessionStorage.getItem('contProductos'))

} else {
    cuenta = 0
}
document.getElementById('icono-contador').textContent = cuenta;
if (sessionStorage.getItem('carrito')) {
    let carritoSS = JSON.parse(sessionStorage.getItem('carrito'))
    carrito = new Cart(carritoSS.articulos)
} else {
    carrito = new Cart()

}
/* -------------------------------- Llamando a mi json -------------------------------- */

let data
let lista;

document.addEventListener('DOMContentLoaded', () => {
    fetchData()
})

const fetchData = async () => {
    try {
        const res = await fetch("../assets/js/productos.json")
        const data = await res.json()
        pintarTarjeta(data)
    } catch (error) {
        // console.log('error');
    }

}

const pintarTarjeta = function (data) {

    let nombreSeccion = document.title.toLowerCase();

    for (producto in data) {
        if (producto = nombreSeccion) {
            lista = data[producto]

            for (let i = 0; i < lista.length; i++) {
                const contenedorCard = document.createElement('div')
                contenedorCard.classList.add('contenedor-card')
                contenedorCard.innerHTML = ` 
                <div class="col-lg-3 col-md-4 col-sm-6 col-12  ">                
                        <div class="card d-flex justify-content-center" style="width:200px">
                            <img class="card-img-top" src="${lista[i].img}" alt="Card image" style="width:100%">
                            <div class="card-body">
                                <h5 class="card-title">${lista[i].nombre}</h5>
                                <p class="card-descripcion">${lista[i].descripcion}</p>
                                <p>$<span class="card-precio">${lista[i].precio}</span></p>
                                <button class="btn btn-primary"data-set=${lista[i].id}>Agregar Al carrito</button>
                            </div>
                        </div>
                </div>   `
                const clone = contenedorCard.cloneNode(true);
                fragment.appendChild(clone);
            }
            item.appendChild(fragment)
        }
    }
    filtrar(lista);
}

function filtrar(lista) {
    let productoFiltrado = 0
    console.log(lista);
    const contenedorSelect = document.querySelector('#filtro')
    contenedorSelect.addEventListener('change', (e) => {

        if (e.target.value == "Menor Precio") {
            productoFiltrado = lista.sort((a, b) => (a.precio - b.precio))
            console.log(productoFiltrado);
            
        }

    })
}







/* ----------- Agregando eventos a los botones agregar al carrito ----------- */
item.addEventListener("click", (e) => {
    if (e.target.classList.contains('btn-primary')) {
        carrito.agregarItem(e.target.parentElement)
        cuenta += 1
        document.getElementById('icono-contador').textContent = cuenta;

        sessionStorage.setItem('carrito', JSON.stringify(carrito))// guardando los productos seleccionados
        sessionStorage.setItem('contProductos', JSON.stringify(cuenta))

    }
})
























