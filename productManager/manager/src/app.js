import express from "express";
import productRouter from "./routes/producs.router"

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use("/api/prducts", productRouter)



app.listen(8080, ()=> console.log("listening on port 8080"));