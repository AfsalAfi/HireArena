import { Request, Response } from 'express';
import AuthService from '../services/authService';

export const signup = async ( req: Request, res: Response ): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const token = await AuthService.signup( name, email, password );
    res.status( 201 ).json( { message: 'User registered successfully', token } );
  } catch ( error ) {
    res.status( 400 ).json( { error: ( error as Error ).message } );
  }
};

export const login = async ( req: Request, res: Response ): Promise<void> => {
  try {
    const { email, password } = req.body;
    const token = await AuthService.login( email, password );
    res.status( 200 ).json( { message: 'Login successful', token } );
  } catch ( error ) {
    res.status( 400 ).json( { error: ( error as Error ).message } );
  }
};
