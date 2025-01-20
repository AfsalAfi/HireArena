export interface IUserRepository {
    findByEmail( email: string ): Promise<any>;
    createUser( name: string, email: string, password: string, role: string ): Promise<any>;
  }
  
