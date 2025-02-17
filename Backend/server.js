import http, { createServer } from "http";
import app from "./app.js";

const PORT = process.env.PORT || 3000


const server = createServer(app);

server.listen(PORT , ()=>{
    console.log(`server is Running On Port ${PORT}`);
})