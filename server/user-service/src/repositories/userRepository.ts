import { PrismaClient } from '@prisma/client';
import { IUserRepository } from '../interfaces/IUserRepository';
import { IUser } from '../types/IUser';
import { IUserCreateRequest } from '../types/IUserCreateRequest';

const prisma = new PrismaClient();

class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { email }
      });
      return user; 
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw new Error('Database query failed');
    }
  }

  async create(userData: IUserCreateRequest): Promise<IUser> {
    try {
      const user = await prisma.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          password: userData.password,
          role: userData.role
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true
        }
      });
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Database query failed');
    }
  }
}

export default new UserRepository();
