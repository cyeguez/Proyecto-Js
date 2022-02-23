window.addEventListener('DOMContentLoaded', function () {
    console.log('El DOM esta listo');
    if (sessionStorage.getItem('carrito')) {
        let carritoSS = JSON.parse(sessionStorage.getItem('carrito'))
        carrito = new Cart(carritoSS.articulos)
    }
    else {
        carrito = new Cart()

    }

    const contenedorCarrito = document.querySelector('#articulos-compra')
    const templateCarrito = document.querySelector('#template-carrito').content
    const fragment = document.createDocumentFragment()
    const ubicarFooter = document.querySelector('#footer-tabla')
    const templateFooter = document.querySelector('#template-footer').content



    contenedorCarrito.addEventListener('click', e => {
        botonAumentoDisminuir(e)
    })



    function pintarCarrito() {
        contenedorCarrito.innerHTML = ""

        Object.values(carrito.articulos).forEach(producto => {

            templateCarrito.querySelector('.tabla-id').textContent = producto.id
            templateCarrito.querySelector('.tabla-nombre').textContent = producto.nombre
            templateCarrito.querySelector('.tabla-descripcion').textContent = producto.descripcion
            templateCarrito.querySelector('.tabla-cantidad').textContent = producto.cantidad
            templateCarrito.querySelector('.btn-info').dataset.id = producto.id
            templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
            templateCarrito.querySelectorAll('span')[0].textContent = producto.precio
            templateCarrito.querySelectorAll('span')[1].textContent = producto.cantidad * producto.precio
            templateCarrito.querySelector('.btn-info').dataset.id = producto.id

            templateCarrito.querySelector('.btn-danger').dataset.id = producto.id


            const clone = templateCarrito.cloneNode(true)
            fragment.appendChild(clone)

        })
        contenedorCarrito.appendChild(fragment)
        paintFooter();
        sessionStorage.setItem('carrito', JSON.stringify(carrito))

    }



    const paintFooter = () => {
        ubicarFooter.innerHTML = ""
        if (Object.keys(carrito.articulos).length === 0) {
            ubicarFooter.innerHTML = `
            <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
            `
            return
        }
        // sumar cantidad y sumar totales
        let nCantidad = Object.values(carrito.articulos).reduce((acc, { cantidad }) => acc + cantidad, 0)
        let nPrecio = Object.values(carrito.articulos).reduce((acc, { cantidad, precio }) => acc + cantidad * precio, 0)
        console.log(nCantidad)
        sessionStorage.setItem('contProductos', JSON.stringify(nCantidad))

        templateFooter.querySelectorAll('td')[1].textContent = nCantidad
        templateFooter.querySelectorAll('span')[1].textContent = nPrecio


        const clone = templateFooter.cloneNode(true)
        fragment.appendChild(clone)
        ubicarFooter.appendChild(fragment)

        const botonvaciar = document.getElementById('vaciar-carrito')
        botonvaciar.addEventListener('click', () => {
            carrito.articulos = {}
            sessionStorage.setItem('carrito', JSON.stringify(carrito))
            nCantidad = 0;
            sessionStorage.setItem('contProductos', JSON.stringify(nCantidad))

            pintarCarrito()
            document.querySelector('.ubicacion-boton').innerHTML = "" //escondo el boton de pago
        })
    }

    sessionStorage.setItem('paintFooter', paintFooter());


    const botonAumentoDisminuir = e => {
        if (e.target.classList.contains('btn-info')) {
            const producto = carrito.articulos[e.target.dataset.id]
            producto.cantidad++
            carrito.articulos[e.target.dataset.id] = { ...producto }
            pintarCarrito()

        }
        if (e.target.classList.contains('btn-danger')) {
            const producto = carrito.articulos[e.target.dataset.id]
            producto.cantidad--
            carrito.articulos[e.target.dataset.id] = { ...producto }
            if (producto.cantidad === 0) {
                delete carrito.articulos[e.target.dataset.id]
            }
            pintarCarrito()

        }
        e.stopPropagation()
    }

    pintarCarrito()




    if (Object.values(carrito.articulos).length > 0) {
        const ubicacionBoton = document.querySelector('.ubicacion-boton')
        const div = document.createElement('div')

        const templateBoton = `<!-- Button trigger modal -->
        <button type="button" class="btn btn-primary w-50" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          Ir a pagar
        </button>
        
        <!-- Modal -->
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Mokapets</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
              ¡¡ A bajarse de la Mula !!, gracias por tu compra.<br>

                Deseo aprovechar este momento para agradecer al profe Francisco, a los tutotes en especial a mio, agradecido Ferran.
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            
              </div>
            </div>
          </div>
        </div> `
        div.innerHTML = templateBoton;
        ubicacionBoton.appendChild(div)
    }


    document.querySelector('.ubicacion-boton').addEventListener('click', () => {
        const mensaje = document.createElement('div')
        mensaje.innerHTML = ``
        document.querySelector('.ubicacion-boton').appendChild(mensaje)
    })

});


