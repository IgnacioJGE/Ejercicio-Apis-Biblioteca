import mongoose from "npm:mongoose@7.6.3";
import { libro } from "../types.ts";
const Schema = mongoose.Schema;

const libroSchema = new Schema(
  {
    titulo: { type: String, required: true,unique:true },
    autor: { type: String,required: true },
    genero: { type: String, required: true},
    cantidad: { type: Number, required: true},
    avileable: { type: Boolean, required: true},
  },
  { timestamps: true }
);

export type tipolibro = mongoose.Document& (libro);// definir el ripo del modelo

export const ModeloLibro= mongoose.model<tipolibro>("Libros",libroSchema)
