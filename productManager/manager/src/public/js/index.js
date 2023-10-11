const socket = io();

//agregar productos

const aggForm = document.getElementById("aggForm")
const productInput = document.getElementById("producto");

aggForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newProduct =productInput.value;

    //enviar el producto por socket
    socket.emit("agregarProducto", newProduct)
    //reset form
    productInput.value= ""
})

//eliminar producto
const deleteForm = document.getElementById("deleteForm");
const producIdInput = document.getElementById("productId");

deleteForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const productId = producIdInput.value;
    //enviar el producto a eliminar por socket
    socket.emit("eliminarproducto",productId)
    //reset
    producIdInput.value=""
})

//mostrarle los productos creados al cliente 

const cont = document.getElementById("contenedorDeProductos");

socket.on("mostrarTodo", data =>{
    cont.innerHTML = "";
    data.forEach(prod =>{
        cont.innerHTML +=`
        <ul>
        <li>${prod.title}</li>
        <li>${prod.price}</li>
        <li>${prod.id}</li>
        </ul>
        `;
    })
})