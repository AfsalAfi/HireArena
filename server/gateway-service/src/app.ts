import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createProxyMiddleware,fixRequestBody } from 'http-proxy-middleware';
import dotenv from 'dotenv';

import {validateAccessToken} from './middleware/validateToken';

dotenv.config();

const app: Application = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',  
  credentials: true 
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Health Check Endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'Gateway Service is up and running!' });
});

app.use((req,res,next)=>{
  console.log(req.url);
  next();
})

// Protected Routes (Example)
app.use(
  '/user-service',
  // validateAccessToken, 
  createProxyMiddleware({
    target: process.env.USER_SERVICE_URL || 'http://localhost:5000',
    changeOrigin: true,
    on: {
      proxyReq: fixRequestBody,
    },
  })
);

// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

export default app;
