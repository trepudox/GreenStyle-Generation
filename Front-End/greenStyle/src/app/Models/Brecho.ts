import { Produto } from "./Produto"

export class Brecho {
    public id: number
    public nome: string
    public descricao: string
    public fotoPerfil: string
    public fotoCapa: string
    public produtos: Produto[]
}