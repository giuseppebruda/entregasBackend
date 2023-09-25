const {productManager} = require("./manager/productManager")

const manager = new productManager("./files/product.json");

const env = async () =>{
    const products = await manager.getProduct();
    console.log(products);

    const product = {
        title: "producto prueba",
        description: "este es un producto de prueba",
        price: 20,
        thumbnail:"sin imagen",
        code : "abc1223",
        stock: 25
    }

    await manager.addProduct(product)

    const productsAgregados = await manager.getProduct();
    console.log(productsAgregados);

}

const getProductByid = async (id) =>{
    
    const producto = await manager.getProductByid(id)
    console.log(producto);
}

const delateProduct = async (id) => {
    const eliminar = await manager.delateProduct(id)
    console.log(eliminar);
}

const updateProduct = async (id, modificaciones) => {
    const modificar = await manager.updateProduct(id, modificaciones)
    console.log(modificar);
}
delateProduct(2)
//getProductByid(2)
//env();
//updateProduct(1,{title: "actializado"})