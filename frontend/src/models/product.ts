export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  data_validade: string;
  imagem?: string;
  categoria_id?: number | null;
}
