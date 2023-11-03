import { Request, Response } from "npm:express@4.18.2";
import { ModeloLibro } from "../db/libros.ts";
export const avileablebooks = async (req: Request, res: Response) => {
    try {
        
        const {titulo,autor, genero } = req.query;

     if (!titulo &&!autor&&!genero) {
         res.status(406).send("Debe al menos especificar un campo de busqueda como título, genero, autor");
        return;
     }
    if(!titulo&&!autor){
        const avileablebook = await ModeloLibro.find({genero,avileable:true}).exec();
        const librosdispponibles = avileablebook.map((avileableBook) => ({
            titulo: avileableBook.titulo,
            autor:avileableBook.autor,
            genero:avileableBook.genero,
            cantidad:avileableBook.cantidad,
            avileable: avileableBook.avileable

          }));
        res.status(200).send(librosdispponibles);
    }
    if(!titulo&&!genero){
        const avileablebook = await ModeloLibro.find({autor,avileable:true}).exec();
        const librosdispponibles = avileablebook.map((avileableBook) => ({
            titulo: avileableBook.titulo,
            autor:avileableBook.autor,
            genero:avileableBook.genero,
            cantidad:avileableBook.cantidad,
            avileable: avileableBook.avileable

          }));
        res.status(200).send(librosdispponibles);
    }
    if(!autor&&!genero){
        const avileablebook = await ModeloLibro.find({titulo,avileable:true}).exec();
        const librosdispponibles = avileablebook.map((avileableBook) => ({
            titulo: avileableBook.titulo,
            autor:avileableBook.autor,
            genero:avileableBook.genero,
            cantidad:avileableBook.cantidad,
            avileable: avileableBook.avileable

          }));
        res.status(200).send(librosdispponibles);
    }
      } catch (error) {
        res.status(500).send(error.message);
      }
    };