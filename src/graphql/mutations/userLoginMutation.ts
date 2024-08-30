import { gql } from "@apollo/client";

export type UserType = {
  email: string;
  password: string;
};

export const LOGIN_USER = gql`
  mutation LoginUser($createAuthInput: CreateAuthInput!) {
    loginUser(createAuthInput: $createAuthInput) {
      user {
        id
        nome
        telefone
        email
      }
      acess_Token
    }
  }
`;
