import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Health Check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'Gateway Service is up and running!' });
});

// Service Proxies
app.use(
  '/user-service',
  createProxyMiddleware({
    target: 'http://localhost:5000', 
    changeOrigin: true
  })
);

app.use(
  '/notification-service',
  createProxyMiddleware({
    target: 'http://localhost:5001', 
    changeOrigin: true
  })
);

// Error Handling
app.use((err: Error, req: Request, res: Response) => {
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});


export default app;
