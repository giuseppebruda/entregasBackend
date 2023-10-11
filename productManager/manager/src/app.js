import express from "express";
import productRouter from "./routes/products.router.js"
import cardRouter from "./routes/card.router.js";
import viewRouter from "./routes/views.router.js"
import handlebars from "express-handlebars"
import {Server} from "socket.io"
import __dirname from './utils.js'
import ProductManager from "./productManager.js"
import path from 'node:path';
import { log } from "node:console";

const productsFilePath = path.join(__dirname, "./files/products.json");
const productManager = new ProductManager(productsFilePath);

const app = express();

app.use(express.static(`${__dirname}/public`));
app.engine("handlebars", handlebars.engine());
app.set("views",`${__dirname}/views`)
app.set("view engine","handlebars")
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use("/", viewRouter)
app.use("/api/prducts", productRouter)
app.use("/api/carts",cardRouter)


const server = app.listen(8080, ()=> console.log("listening on port 8080"));

const socketServer = new Server(server);
app.set('socketio', socketServer);

socketServer.on("connection", socket=>{
    console.log("usuario conectado")
// agregar el producto que creo el cliente 
    socket.on("agregarProducto" , async (data) =>{
        try {
            await productManager.addProduct(JSON.parse(data));
            socketServer.emit("mostrarTodo", await productManager.getProduct());
        } catch (error) {
            console.log(error);
        }
    })

    socket.on("eliminarproducto", async (data) =>{
        try {
            const id = Number(data)
            await productManager.delateProduct(id);
            socketServer.emit("muestrotodo", await productManager.addProduct())
        } catch (error) {
            console.log(error);
        }
    })
})


