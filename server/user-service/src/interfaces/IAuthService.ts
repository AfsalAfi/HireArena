import { IUserCreateRequest } from '../types/IUserCreateRequest';
import { IAuthResponse } from '../types/IAuthResponse';

export interface IAuthService {
  register: (userData: IUserCreateRequest) => Promise<IAuthResponse>;
  login: (email: string, password: string) => Promise<IAuthResponse>;
}
