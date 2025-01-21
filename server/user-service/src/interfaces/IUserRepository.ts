// user-service/interfaces/IUserRepository.ts

import { IUser } from '../types/IUser';
import { IUserCreateRequest } from '../types/IUserCreateRequest';

export interface IUserRepository {
  create: (userData:IUserCreateRequest) => Promise<IUser>;
  findByEmail: (email: string) => Promise<IUser | null>;
  // findById: ( id: number ) => Promise<IUser | null>;
}
