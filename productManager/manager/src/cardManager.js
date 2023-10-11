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
    async addProductToCart(cartId, productId) {
        const carts = await this.getCarts();
        const cart = carts.find((c) => c.id === cartId);
        if (cart) {
            const existingProduct = cart.products.find((p) => p.id === productId);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.products.push({ id: productId, quantity: 1 });
        }
        await promises.writeFile(
        this.filePath,
        JSON.stringify(carts, null, 2),
        "utf-8"
        );
        return cart;
        } else {
        return null;
        }
    }
    }

    export default CardManager