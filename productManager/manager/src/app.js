import express from "express";
import productManager from "./productManager.js"
const app = express();


const manager = new productManager("./files/product.json")

//creando la ruta con queryparams

app.get("/product", async(req,res)=>{
    const product = await manager.getProduct();
    const limit = parseInt(req.query.limit);
    if(limit){
        const result =  product.slice(0,limit)
        res.send(result)
    }res.send(product)
    
    })


// creando la ruta con path params

app.get("/product/:pid",async(req,res)=>{
    let productId = parseInt(req.params.id)
    const getProductByid = await manager.getProductByid(productId);
    res.send(getProductByid)

})

app.listen(8080, ()=> console.log("listening on port 8080"));