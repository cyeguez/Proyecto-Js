class Cart {
    constructor(articulos = {}, total = 0) {
        this.articulos = articulos;
        this.total = total;
    }


    agregarItem = objeto => {
       
        const producto = {
            id: Number(objeto.querySelector('.btn-primary').dataset.set),
            nombre: objeto.querySelector('.card-title').textContent,
            descripcion: objeto.querySelector('p').textContent,
            precio: objeto.querySelector('span').textContent,
            cantidad: 1
        }        

        if (this.articulos.hasOwnProperty(producto.id)) {
            producto.cantidad = this.articulos[producto.id].cantidad + 1
        }
        this.articulos[producto.id] = { ...producto }      



    }

   
 contador() {
    document.getElementById('icono-contador').innerHTML=''
    document.getElementById('icono-contador').textContent = Object.values(carrito.articulos).length;   
    this.agregarItem()
   
}

}









