import { IAuthService } from '../interfaces/IAuthService';
import { IUserRepository } from '../interfaces/IUserRepository';
import { IUserCreateRequest } from '../types/IUserCreateRequest';
import { IAuthResponse } from '../types/IAuthResponse';
import { IUser } from '../types/IUser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class AuthService implements IAuthService {
  private userRepository: IUserRepository;
  private jwtSecret: string;

  constructor(userRepository: IUserRepository, jwtSecret: string) {
    this.userRepository = userRepository;
    this.jwtSecret = jwtSecret;
  }

  async register(userData: IUserCreateRequest): Promise<IAuthResponse> {
    
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    const user = await this.userRepository.create(userData);

    const token = this.generateAuthToken(user.id, user.role);
    return { token, user };
  }

  async login(email: string, password: string): Promise<IAuthResponse> {
    console.log('Reaching to login service layer');

    const user: IUser | null = await this.userRepository.findByEmail(email);
    console.log(user);
    
    if (!user || !user.password) { 
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Generate auth token
    const token = this.generateAuthToken(user.id, user.role);
    return { token, user };
  }

  private generateAuthToken(userId: string, role: string): string {
    return jwt.sign({ userId, role }, this.jwtSecret, {
      expiresIn: '1h'
    });
  }
}

export default AuthService;
