import pool from '../config/db';
import { IUserRepository } from '../interfaces/IUserRepository';

class UserRepository implements IUserRepository {
  async findByEmail( email: string ): Promise<any> {
    const result = await pool.query( 'SELECT * FROM users WHERE email = $1', [
      email
    ] );
    return result.rows[0];
  }

  async createUser(
    name: string,
    email: string,
    password: string,
    role: string
  ): Promise<any> {
    const result = await pool.query(
      `INSERT INTO users (name, email, password, role) 
       VALUES ($1, $2, $3, $4) RETURNING id, name, email, role`,
      [ name, email, password, role ]
    );
    return result.rows[0];
  }
}

export default new UserRepository();
