import { Router } from "express";
import ProductManager from "../productManager.js";

const router = Router()
const manager = new ProductManager("./files/product.json");

router.get("/", async(req,res) =>{
    const products = await manager.getProduct();
    res.render("home", {products: products})
})

router.get("/realtimeproducts", async(req,res)=>{
const products = await manager.getProduct();
res.render("realtimeproducts",{products: products})
})

export default router;