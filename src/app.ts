import express, {Express, Request, Response, NextFunction} from 'express';
import connectDB from './db';
import router from './routes/auth';
const app: Express = express();

connectDB();

// Middleware
app.use(express.json());

app.use('/api/auth', router);

// Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

// Basic route
app.get('/', (req: Request, res: Response) => {
    res.send("Welcome to MyCash App!");
});

export default app;