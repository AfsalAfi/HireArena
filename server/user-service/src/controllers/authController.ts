import { IGenericResponse } from './../../../types/IGenericResponse';
import { IError } from './../../../types/IError';
import { Request, Response } from 'express';
import { IAuthService } from '../interfaces/IAuthService';
import { IAuthResponse } from '../types/IAuthResponse';
import { IUserCreateRequest } from '../types/IUserCreateRequest';

class AuthController {
  private authService: IAuthService;

  constructor(authService: IAuthService) {
    this.authService = authService;
  }

  register= async (
    req: Request,
    res: Response<IGenericResponse<IAuthResponse | IError>>
  ) => {
    try {
      const userData: IUserCreateRequest = req.body;
      
      const authResponse = await this.authService.register(userData);
      res.status(201).json({
        status: 'success',
        message: 'User registered successfully',
        data: authResponse
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'An error occurred during registration',
        error: (error as Error).message
      });
    }
  };

  login = async (
    req: Request,
    res: Response<IGenericResponse<IAuthResponse | IError>>
  ) => {
    try {
      const { email, password } = req.body;
      console.log(email, password);

      console.log(this.authService);

      const authResponse = await this.authService.login(email, password);
      res.status(200).json({
        status: 'success',
        message: 'User logged in successfully',
        data: authResponse
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        status: 'error',
        message: 'An error occurred during login',
        error: (error as Error).message
      });
    }
  };
}

export default AuthController;
