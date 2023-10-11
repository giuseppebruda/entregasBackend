import { Router } from "express";
import ProductManager from "../productManager.js"

const manager = new ProductManager("./src/files/product.json")
const router = Router();


router.get("/", async(req,res)=>{
    const product = await manager.getProduct();
    const limit = parseInt(req.query.limit);
    if(limit){
        const result =  product.slice(0,limit)
        res.send(result)
    }else{res.send(product)} 
    
    })

    router.get("/:pid",async(req,res)=>{
        let productId = parseInt(req.params.pid)
        const getProductByid = await manager.getProductByid(productId);
        if (!productId) {
            res.status(404).send({status: "error", error:"product not found"})
        }else{
            res.send(getProductByid)
        }
    })

    router.post("/", async(req,res) =>{
        try {
            const product = req.body
            let addProduct = await manager.addProduct(product)
            res.send({ status: "success", payload: addProduct })
    
        } catch (error) {
            res.status(500).send({ error: error })
        }
    })

    router.put("/:pid", async(req,res)=>{
        const id = parseInt(req.params.pid);
        const modificaciones = req.body;
        const update = await manager.updateProduct(id, modificaciones)
        res.send ({status : true, payload: update})
        if (id===req.body.id) {
            res.status(404).send({status: "error", error:"product not found"})
        }
    })

    router.delete("/:pid", async(req,res) =>{
        const id = parseInt(req.params.pid);
        const eliminar = manager.delateProduct(id)
        if (id === req.id) {
            return res.status(404).send({status: "error", error:"product not found"})
        }else{
            res.send ({status : true, payload: `producto eliminado${eliminar}` })
        }
    })


    export default router;