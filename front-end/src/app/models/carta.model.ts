export interface Carta {
  id: number,
  nome: string,
  descricao: string,
  url?:string,
  ataque: number,
  defesa: number,
  tipo: string;
  classe: string
}
