import { gql } from "@apollo/client";

export type ProductType = {
  produto: string;
  categoria: string;
  subCategoria: string;
  quantidade: number;
  valor: number;
  imagemProfile?: string;
  userId?: string;
};
export type VendaType = {
  id?: string;
  data_venda?: Date;
  productsIds?: string[];
  userId?: string;
};
export type UserType = {
  nome: string;
  telefone: string;
  email: string;
  password: string;
  imagemProfile?: string;
  products?: ProductType[];
  vendas?: VendaType[];
};

export const REGISTER_USER = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      nome
      password
      email
      telefone
    }
  }
`;
