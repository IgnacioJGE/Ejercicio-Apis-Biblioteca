import { Request, Response } from "npm:express@4.18.2";
import { ModeloLibro } from "../db/libros.ts";




export const addBook = async (req: Request, res: Response) => {
  try {
    const { titulo,autor,genero,cantidad,avileable } = req.body;
    if(!titulo || !autor || !genero || !cantidad||!avileable) {
      res.status(406).send("Título, autor, genero, cantidad y disponibilidad son necesarios");
      return;
    }

    if(typeof titulo !== "string" || typeof autor !== "string" || typeof genero !== "string" || typeof cantidad !== "number"||typeof avileable!=="boolean") {
      res.status(407).send("Invalid datatype");

    }
    const alreadyExists = await ModeloLibro.findOne({ titulo }).exec();
    if(alreadyExists){
        res.status(407).send("Ya existe este libro "); 
    }

    const nuevolibro = new ModeloLibro({ titulo, autor, genero, cantidad,avileable });
    await nuevolibro.save();

    res.status(200).send({
      titulo: nuevolibro.titulo,
      autor: nuevolibro.autor,
      genero: nuevolibro.genero,
      cantidad: nuevolibro.cantidad,
      avileable: nuevolibro.avileable,
    });
  } catch(error) {
    res.status(500).send(error.message);
    return;
  }
};



