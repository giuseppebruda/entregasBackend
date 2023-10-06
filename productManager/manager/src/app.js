import express from "express";
import productRouter from "./routes/producs.router.js"
import cardRouter from "./routes/card.router.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use("/api/prducts", productRouter)
app.use("/api/carts",cardRouter)


app.listen(8080, ()=> console.log("listening on port 8080"));