// primero creo la clase productManager

class productManager{
    constructor() {
        this.product = [];
    }
// get product para mostrar todos los eventos creados hasta el momento
    getProduct = () => {
        return this.product
    }
// add product para agregar nuevos productos
    addProduct = (title, description,price,thumbnail,code,stock) => {
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
// generacion del id autoincrementable
        if (this.product.length === 0) {
            product.id = 1;
        }else{
            product.id = this.product[this.product.length -1].id + 1;
        }
        //no retetir el code
        if (this.product.some(product => product.code === code)) {
            console.log(" el campo CODE de cada producto debe ser unico y no puede repetirse");
            return
        }
        //validacion
        if (title || description|| price || thumbnail || code || stock != "") {
            this.product.push(product)
        }else{
            console.log("los campos son obligatorios para agregar un producto");
        }
    }
//getproductbyid para buscar el producto 
    getProductById = (id) =>{
        const buscarProducto = this.product
        .find( product => product.id === id)
        if (buscarProducto === undefined) {
            console.log("producto no encontrado");
            return;
        }else{
            console.log(this.product);
        }
}
}


