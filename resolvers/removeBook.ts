import { Request, Response } from "npm:express@4.18.2";
import { ModeloLibro } from "../db/libros.ts";

export const removeBook = async (req: Request, res: Response) => {
  try {
    const { titulo,autor,genero,cantidad,avileable } = req.body;
    if(!titulo ) {
        res.status(406).send("El título es necesario para eliminar el libro");
        return;
      }

    const Libroencontrado= await ModeloLibro.findOne({titulo}).exec();
    if (!Libroencontrado) {
      res.status(404).send("Libro no encontrado");
      return;
    }
     await ModeloLibro.findByIdAndRemove(Libroencontrado._id);
    res.status(200).send("Libro eliminado");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};
