import fs from "fs"
import productManager from "./productManager.js"


const manager = new productManager("./files/product.json")



export default class cardManager{
    constructor(path){
        this.path= path;
    }

    createDocument = async () => {
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
}

    addCard = async (card) =>{
        try {
            const array = await this.createDocument()
            const {productos=[{id:id,cantidad:1}]}=card
            // generacion del id autoincrementable
            if (array.length === 0) {
            card.idc = 1;
            }else{
            card.idc = array[array.length -1].idc + 1;
                }
                array.push(card)
                await fs.promises.writeFile(this.path, JSON.stringify(array, null, "\t"))
                return card;        
            } catch (error) {
            console.log(error);
        }
    }

    getCardById = async (idc) =>{
        try {
            const array = await this.createDocument()

            const buscarCarrito = array.
            find(card => card.idc === idc)
            if (buscarCarrito=== undefined) {
                console.log("el id de ese carrito no existe")
                return
            } else {
                return buscarCarrito
            }
        } catch (error) {
            console.log(error);
        }
    addProductByCard = async (idc,id,cantidad) =>{
    try {
        
    const product = await manager.getProductByid(id);
    const carrito = array.
            find(card => card.idc === idc)
            if (buscarCarrito=== undefined) {
                console.log("el id de ese carrito no existe")
                return
            } 
            const addProduct = carrito.productos.find(product => product.id === id)
            if (addProduct=== undefined) {
                cantidad = 1
            } else {
                cantidad ++
            }
            carrito.productos.push(product.id,cantidad)



    } catch (error) {
        console.log(error);
    }

    }
}