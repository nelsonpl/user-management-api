export interface IUser {
    id: string;
    cpf: string;
    name: string;
    birthDate: Date;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    status: 'ACTIVE' | 'REMOVED';
    createdAt: Date;
    createdBy: string;
    updatedAt: Date;
    updatedBy?: string;
    removedAt?: Date;
    removedBy?: string;
  }