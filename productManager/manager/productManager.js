const fs = require ("fs");

class productManager {
    constructor(path){
        this.path = path;
    }
    //getProduct para crear el archivo o leer lo que ya exista 
    getProduct = async () => {
        try {
            if (fs.existsSync(this.path)) {
                
                const data = await fs.promises.readFile(this.path, "utf-8");
                const users = JSON.parse(data);
                return users;
            } else{
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    } 
    //para agregar productos al JSON
    addProduct = async () => {
        try {
            const products = await this.getProduct();
            //definimos el modelo del objeto a agregar 
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
            if (!title || !description|| !price || !thumbnail || !code || !stock) {
            console.error("ingresa todos los datos")
            return
            }
            //agregando el producto al JSON
            products.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"))
            return product;

            //buscar productos y retornarlo por el id 
            getProductByid = async () => {
                try {
                const products = await this.getProduct();
                const buscarProducto = products
            .find( products => products.id === id)
            if (buscarProducto === undefined) {
            console.log("producto no encontrado");
            return;
            }else{
            return buscarProducto;
            }
                } catch (error) {
                    console.log(error);
                }
            }

            //updateProduct para modificar producuctos dentro de la bd
            updateProduct = async () => {
                try {
                    const products = await this.getProduct()
                    const buscarProducto = products
            .find( products => products.id === id)
            if (buscarProducto === undefined) {
            console.log("producto no encontrado");
            return;
            }else{
            
            }
                } catch (error) {
                    console.log(error);
                }
            }

        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = {
    productManager
}