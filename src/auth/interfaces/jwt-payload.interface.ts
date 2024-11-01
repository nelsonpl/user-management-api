export interface JwtPayload {
    sub: string;
    cpf: string;
    name: string;
    iat?: number;
    exp?: number;
  }