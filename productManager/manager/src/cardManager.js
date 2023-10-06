import fs from "fs"
import ProductManager from "./productManager.js"


const manager = new ProductManager("./files/product.json")



class CardManager{
    constructor(path){
        this.path= path;
    }

    createDocument = async () => {
        try {
                const data = await fs.promises.readFile(this.path, "utf-8");
                const cards = JSON.parse(data);
                console.log(cards);
                return cards;
        } catch (error) {
            console.log(error);
        }
    } 
    addCard = async () =>{
        try {
            const array = await this.createDocument()
            let idCart
            
            if (array.length===0) {
                idCart=1;
            } else {
                idCart =array[array.length-1].id + 1 ;
            }
            let newCart = array.push({id: idCart, products: []})
            await fs.promises.writeFile(this.path, JSON.stringify(array,null,"\t"))
            return newCart;
            } catch (error) {
            console.log(error);
        }
    }
    getCardById = async (cardId) =>{
        try {
            const array = await this.createDocument()

            const cart = array.find((c) => c.id === cardId)
            if (cart) {
                return cart
            } else {
                return "producto no encontrado"
            }
        } catch (error) {
            console.log(error);
        }
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

    export default CardManager