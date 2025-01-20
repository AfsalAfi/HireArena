export interface IAuthService {
    signup( name: string, email: string, password: string ): Promise<string>;
    login( email: string, password: string ): Promise<string>;
  }
  
