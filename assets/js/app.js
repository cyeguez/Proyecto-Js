/* ----------------------------------- DOM ---------------------------------- */
const item = document.querySelector('#items')


// const boton = document.querySelectorAll('.card-boton')
const contadorIcono = document.querySelector('#contador')
const fragment = document.createDocumentFragment()
const contenedorCarrito = document.querySelector('#articulos-compra')


/* ----------------------------------- DOM ---------------------------------- */

let carrito
let cuenta
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
let ruta = "../assets/js/productos.json"
let datos = []
var lista;

fetch(ruta)
    .then((response) => response.json())
    .then((json) => {
        const datos = (json)

        let nombreSeccion = document.title.toLowerCase();
        if (nombreSeccion == 'perros' || nombreSeccion == 'gatos' || nombreSeccion == 'roedores' || nombreSeccion == 'aves' || nombreSeccion == 'peces' || nombreSeccion == 'reptiles' || nombreSeccion == 'caballos') {
            for (producto in datos) {
                if (producto = nombreSeccion) {
                    lista = datos[producto]

                }
            }

        }

        /* -------------------------------- Llamando a mi json -------------------------------- */

        /* ------------------------ mostrando los productos ------------------------ */
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
            </div>   
    `


            const clone = contenedorCard.cloneNode(true);
            fragment.appendChild(clone);
        }
        item.appendChild(fragment)

    })


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




// /* ----------- Agregando eventos a los botones agregar al carrito ----------- */























