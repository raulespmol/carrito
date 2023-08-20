//Variables
const carrito = document.querySelector('#carrito');
const contenidoCarrito = document.querySelector('#lista-carrito tbody');
const btnVaciar = document.querySelector('#vaciar-carrito');
const galeria = document.querySelector('#galeria');
let itemsEnCarrito = [];

//Listeners
cargarListeners();
function cargarListeners(){
    galeria.addEventListener('click', agregarItem); //Agregar desde el boton 'Agregar al carrito'

    contenidoCarrito.addEventListener('click', eliminarItem); //Eliminar un item del carrito

    btnVaciar.addEventListener('click', vaciarCarrito);
}

//Funciones Principales
function agregarItem(e) {
    e.preventDefault();
    if(e.target.classList.contains('btn')){
        const itemSeleccionado = e.target.parentElement.parentElement;
        leerInfoItem(itemSeleccionado);
        sumarCantidad();
        actualizarCarrito();
    }
}

function eliminarItem(e) {
    e.preventDefault();
    if(e.target.classList.contains('eliminar-item')){
        const itemId = e.target.getAttribute('data-id');
        itemsEnCarrito = itemsEnCarrito.filter( item => item.id !== itemId)
        actualizarCarrito();
    }
}

function vaciarCarrito(e) {
    e.preventDefault();
    limpiarHTML();
}

//Funciones Secundarias
function leerInfoItem(item){
    infoItem = {
        imagen: item.querySelector('img').src,
        titulo: item.querySelector('.card-title').textContent,
        precio: item.querySelector('.precio').textContent,
        id: item.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
}

function sumarCantidad() {
    const existe = itemsEnCarrito.some( item => item.id === infoItem.id )
    if(existe){
        const items = itemsEnCarrito.map( item => {
            if(item.id === infoItem.id){
                item.cantidad++;
                return item;
            } else {
                return item;
            }
        } )
        itemsEnCarrito = [...items];
    } else {
        itemsEnCarrito = [...itemsEnCarrito, infoItem];
    }
}

function actualizarCarrito() {
    limpiarHTML();
    itemsEnCarrito.forEach( item => {
        const {imagen, titulo, precio, cantidad, id} = item;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td> <img src="${imagen}" width="100"> </td>
        <td> <p>${titulo}</p> </td>
        <td> <p>${precio}</p> </td>
        <td> <p>${cantidad}</p> </td>
        <td> <a href="#" class="eliminar-item" data-id="${id}">X</a> </td>
        `;
        contenidoCarrito.appendChild(row)
    })
}

function limpiarHTML() {
    while(contenidoCarrito.firstChild){
        contenidoCarrito.removeChild(contenidoCarrito.firstChild);
    }
}