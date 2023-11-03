
import express,{Request,Response} from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
import { addBook } from "./resolvers/addbook.ts";
import { removeBook } from "./resolvers/removeBook.ts";
import { avileablebooks } from "./resolvers/avileableBooks.ts";
import { borrowBook } from "./resolvers/borrowBook.ts";
const env = await load();
const MONGO_URL=env.MONGO_URL||Deno.env.get("MONGO_URL")// si hay .emv lo leo si no lo lee de las variables de entorno de deno
const PORT=env.PORT||Deno.env.get("PORT")||3000
if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}
try{
await mongoose.connect(MONGO_URL);
console.info("Mongo Concectado")
const app= express();
app.use(express.json())
app.post("/addBook",addBook)
   .delete("/removeBook",removeBook) 
   .get("/availableBooks",avileablebooks)
   .put("/borrowBook",borrowBook)


app.listen(PORT,()=> console.info ((`Te estoy escuchando desde ${PORT}`)));
}catch(e){
  console.error(e)
}


