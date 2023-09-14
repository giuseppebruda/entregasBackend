const {productManager} = require("./manager/productManager")

const manager = new productManager("./files/product.json");

const env = async () =>{
    const products = await manager.getProduct();
    console.log(products);

    const product1 = {
        title: "producto prueba",
        description: "este es un producto de prueba",
        price: 200,
        thumbnail:"sin imagen",
        code : "abc123",
        stock: 25
    }

    await manager.addProduct(product1)

    const productsAgregados = await manager.getProduct();
    console.log(productsAgregados);
}
env();