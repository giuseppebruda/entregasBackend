import fs from "fs"


class ProductManager { 
    constructor(path){
        this.path = path;
    }
    //getProduct para crear el archivo o leer lo que ya exista 
    getProduct = async () => {
        try {
                const data = await fs.promises.readFile(this.path, "utf-8");
                const products = JSON.parse(data);
                return products;
        } catch (error) {
            console.log(error);
        }
    } 
    //para agregar productos al JSON
    addProduct = async (product) => {
        try {
            const products = await this.getProduct();

            const {title,description,price,thumbnail,code,stock}=product
            
            // generacion del id autoincrementable
            if (products.length === 0) {
            product.id = 1;
            }else{
            product.id = products[products.length -1].id + 1;
            }
            //no retetir el code
            if (products.some(product => product.code === code)) {
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
        } catch (error) {
            console.log(error);
        }
    }
           //buscar productos y retornarlo por el id 
        getProductByid = async (id) => {
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
        updateProduct = async (id,modificaciones) => {
            try {
                const products = await this.getProduct()
                const index =  products.findIndex((product) =>{
                    return product.id === id;
                })
                products[index]= {
                    ...products[index],...modificaciones
                }
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"))

                return products[index]

            } catch (error) {
                console.log(error);
            }
        }
        delateProduct = async (id) => {
            try {
                const products = await this.getProduct()
                const index =  products.findIndex((product) =>{
                    return product.id === id;
                })
                products.splice(index,1);
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"))
                return products

            } catch (error) {
                console.log(error);
            }
        }
}

export default ProductManager
// module.exports = {
//     productManager
// }