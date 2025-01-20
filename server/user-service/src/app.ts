import express, { Application, Request, Response} from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app: Application = express();

app.use( express.json() );
app.use( cors() );
app.use( helmet() );
app.use( morgan( 'dev' ) );

app.use( '/api/auth', authRoutes );

app.get( '/health', ( req:Request, res:Response ) => {
    res.status( 200 ).json( { status: 'User Service is running!' } );
    return;
}  );

export default app;
