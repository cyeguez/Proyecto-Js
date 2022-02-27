/* ----------------------------------- DOM ---------------------------------- */
const item = document.querySelector('#items')
// const boton = document.querySelectorAll('.card-boton')
const contadorIcono = document.querySelector('#contador')
const fragment = document.createDocumentFragment()
const contenedorCarrito = document.querySelector('#articulos-compra')
const contenedorSelect = document.querySelector('#filtro-select')
/* ----------------------------------- DOM ---------------------------------- */
let carrito
let lista
let listaOrdena


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





const pintarTarjeta = (arreglo) => {

    let nombreSeccion = document.title.toLowerCase();
     lista
    
    for (producto in arreglo) {
        if (producto = nombreSeccion) {
            lista = arreglo[producto]
            for (let productos of (lista)) {

                const contenedorCard = document.createElement('div')
                contenedorCard.classList.add('contenedor-card')
                contenedorCard.innerHTML = ` 
                <div class="col-lg-3 col-md-4 col-sm-6 col-12  ">                
                        <div class="card d-flex justify-content-center" style="width:200px">
                            <img class="card-img-top" src="${productos.img}" alt="Card image" style="width:100%">
                            <div class="card-body">
                                <h5 class="card-title">${productos.nombre}</h5>
                                <p class="card-descripcion">${productos.descripcion}</p>
                                <p>$<span class="card-precio">${productos.precio}</span></p>
                                <button class="btn btn-primary"data-set=${productos.id}>Agregar Al carrito</button>
                            </div>
                        </div>
                </div>   `
                const clone = contenedorCard.cloneNode(true);
                fragment.appendChild(clone);
            }
            item.appendChild(fragment)
        }
    }
    console.log(lista);


    listaOrdena=filtrar(lista, contenedorSelect);
}



const filtrar = (arreglo, select) => {
    let productoFiltrado = 0


    select.addEventListener('change', (e) => {
        if (e.target.value == "Menor Precio") {
            productoFiltrado = arreglo.sort((a, b) => (a.precio - b.precio))
            console.log(productoFiltrado);
            pintarTarjeta(productoFiltrado)

        }
        if (e.target.value == "Mayor Precio") {
            productoFiltrado = arreglo.sort((a, b) => (b.precio - a.precio))
            console.log(productoFiltrado);
            return(productoFiltrado)

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

console.log(listaOrdena);






















