import { Router } from "express";
import productManager from "./productManager.js"

const manager = new productManager("./files/product.json")
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
        if(!title||!description||price||code||stock){
        return res.status(400).send({status: "erro", error:"incomplete values"})
        }else{
            addProduct = await manager.addProduct()
            res.send({status: "success", menssage: "product created"})
        }
    })

    router.put("/pid", async(req,res)=>{
        const id = parseInt(req.params.pid);
        const {title,description,price,code,stock,thumnail} =req.body;
        const update = await manager.updateProduct(id, title,description,price,code,stock,thumnail)
        res.send ({status : subccess, payload: update})
        if (id===req.body.id) {
            res.status(404).send({status: "error", error:"product not found"})
        }
    })

    router.delete("/pid", async(req,res) =>{
        const id = parseInt(req.params.pid);
        const eliminar = manager.delateProduct(id)
        if (id === req.id) {
            return res.status(404).send({status: "error", error:"user not found"})
        }else{
            res.send ({status : subccess, payload: eliminar })
        }
    })


    export default router;