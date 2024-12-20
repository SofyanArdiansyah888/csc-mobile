import { ClientEntity } from './Client.entity';

export interface UserEntity {
    name: string;
    email: string;
    role?: string;
    client?: ClientEntity;
  }
