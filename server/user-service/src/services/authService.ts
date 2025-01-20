import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/userRepository';
import { IAuthService } from '../interfaces/IAuthService';

class AuthService implements IAuthService {
  async signup( name: string, email: string, password: string ): Promise<string> {
    const existingUser = await UserRepository.findByEmail( email );
    if ( existingUser ) {
      throw new Error( 'Email already in use' );
    }

    const hashedPassword = await bcrypt.hash( password, Number( process.env.BCRYPT_SALT_ROUNDS ) );
    const user = await UserRepository.createUser( name, email, hashedPassword, 'interviewee' );

    return this.generateToken( user.id, user.role );
  }

  async login( email: string, password: string ): Promise<string> {
    const user = await UserRepository.findByEmail( email );
    if ( !user ) {
      throw new Error( 'Invalid email or password' );
    }

    const isPasswordValid = await bcrypt.compare( password, user.password );
    if ( !isPasswordValid ) {
      throw new Error( 'Invalid email or password' );
    }

    return this.generateToken( user.id, user.role );
  }

  private generateToken( userId: number, role: string ): string {
    return jwt.sign( { id: userId, role }, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRATION
    } );
  }
}

export default new AuthService();
