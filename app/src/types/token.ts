import { User } from './User';

export interface Token {
  data: User;
  iat: number;
  exp: number;
}
