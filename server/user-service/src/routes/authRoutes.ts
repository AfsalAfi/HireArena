// user-service/routes/authRoutes.ts

import { Router } from 'express';
import AuthService from '../services/authService';
import AuthController from '../controllers/authController';
import UserRepository from '../repositories/userRepository';

// console.log(UserRepository.findByEmail("sfs"));


const authService = new AuthService(UserRepository,'/]af[sadf;assdafdsfsadfasdfd');

console.log(authService);

const authController = new AuthController(authService);

const router = Router();

router.post('/signup', authController.register);
router.post('/login', authController.login);

export default router;
