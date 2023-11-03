import { Request, Response } from "npm:express@4.18.2";
import { ModeloLibro } from "../db/libros.ts";

export const borrowBook = async (req: Request, res: Response) => {
  try {

    const {titulo} = req.query;
    if(!titulo){
        
        res.status(404).send("Es necesario un título para poder prestar un libro");
        return;
    }

    const libroprestado = await ModeloLibro.findOne({titulo}).exec();

    if (!libroprestado) {
      res.status(404).send("Libro no encontrado");
      return;
    }
if(libroprestado.avileable==false){
  res.status(404).send("El libro que buscas no esta disponible");
  return;
}
const libroprestadook = await ModeloLibro.findOneAndUpdate({titulo}
  ,{cantidad:(libroprestado.cantidad-1)},{new:true}).exec();
    res.status(200).send({
      titulo: libroprestadook?.titulo,
      autor: libroprestadook?.autor,
      genero: libroprestadook?.genero,
      cantidad: libroprestadook?.cantidad,
      avileable: libroprestadook?.avileable,
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

