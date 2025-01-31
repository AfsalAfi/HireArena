// user-service/routes/authRoutes.ts

import { Router } from "express";
import AuthService from "../services/AuthService";
import AuthController from "../controllers/AuthController";
import JobSeekerRepository from "../repositories/JobSeekerRepository";
import prisma from "../config/prismaClient";
import RedisService from "../services/RedisServices";
import PasswordService from "../services/PasswordServices";
import TokenService from "../services/TokenServices";
import EmailService from "../services/EmailServices";
import CompanyRepository from "../repositories/CompanyRepository";

const userRepository = new JobSeekerRepository(prisma);
const companyRepository = new CompanyRepository(prisma);
const redisService = new RedisService();
const passwordService = new PasswordService();
const tokenService = new TokenService();
const emailService = new EmailService();

const authService = new AuthService(
  userRepository,
  companyRepository,
  redisService,
  emailService,
  passwordService,
  tokenService
);

const authController = new AuthController(authService);

const router = Router();

router.post("/signup", authController.signup);
router.post("/verify-email/:token", authController.verifyToken);
router.post("/login", authController.login);
router.post("/company-signup", authController.signupCompany);
router.post("/company-login", authController.loginCompany);
router.post("/company/invite", authController.sendInvitation);
// router.post("/company/accept-invite", authController.acceptInvitation);
// router.post("/refresh-token", authController.refresh);

export default router;
