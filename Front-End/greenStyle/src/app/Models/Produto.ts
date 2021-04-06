import { Brecho } from "./Brecho"
import { Categoria } from "./Categoria"

export class Produto{
    public id: number
    public nome: String
    public preco: number
    public foto: String
    public categoria: Categoria
    public brecho: Brecho
}