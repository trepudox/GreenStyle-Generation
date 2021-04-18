import { Brecho } from "./Brecho"
import { Categoria } from "./Categoria"

export class Produto{
    public id: number
    public nome: string
    public descricao: string
    public tamanho: string
	public cor: string
	public disponivel: boolean
    public preco: number
    public foto: string
    public categoria: Categoria
    public brecho: Brecho
}
