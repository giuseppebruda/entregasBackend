import express from "express";
import { productManager } = require("./productManager")
const app = express();

const manager= new productManager("./files/product.json");

//creando la ruta con queryparams

app.get("/product", async(req,res)=>{
    const product = await manager.getProduct();
    const limit = Number(req.query.limit);
    if(limit){
        const result =  product.slice(0,limit)
        res.send(result)
    }else{
        res.send(product)
    }
    })


// creando la ruta con path params

app.get("/product/:pid",async(req,res)=>{
    res.send(await manager.getProductByid(req.params.pid))
})

app.listen(8080, ()=> console.log("listening on port 8080"));