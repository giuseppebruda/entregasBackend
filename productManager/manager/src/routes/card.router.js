import { Router } from "express";
import CardManager from "../cardManager.js"


const manager = new CardManager ("./src./files/card.json")
const router = Router()

router.post("/", async (req,res) =>{
    try {
        await manager.addCart()
        res.send({status: "success", menssage: "cart created"})
        
    } catch (error) {
        res.send({error: error})
    }
})

router.get("/:pid",async(req,res)=>{
    let cardId = parseInt(req.params.pid)
    const getProductByIdc = await manager.getCardById(cardId)
    if (!cardId) {
        res.status(404).send({status: "error", error:"card not found"})
    } else {
        res.send ({status : "success", payload: getProductByIdc})
    }
})

router.post("/:cid/product/:pid/", async(req,res)=>{
    try {
        const idCart = parseInt(req.params.pid)
        const id = parseInt(req.params.pid)
        const addProduct = await manager.addProductByCard(idCart,id)
    if (!idCart||!id) {
        res.status(400).send({status: "error", error:"incomplete values"})
    } else {
        res.send ({status : "success", payload: addProduct})
    }
    } catch (error) {
        res.send({error: error})
    }
})

export default router