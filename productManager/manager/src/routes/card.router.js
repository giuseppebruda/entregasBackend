import { Router } from "express";
import cardManager from "./cardManager.js"


const manager = new cardManager ("./files/card.json")
const router = Router()

router.post("/", async (req,res) =>{
    addproduct= await manager.addproduct
    res.send({status: "success", menssage: "product created"})
})

router.get("/:pid",async(req,res)=>{
    let cardId = parseInt(req.params.pid)
    const getProductByIdc = await manager.getCardById(cardId)
    if (!cardId) {
        res.status(404).send({status: "error", error:"card not found"})
    } else {
        res.send ({status : subccess, payload: getProductByIdc})
    }
})

export default router