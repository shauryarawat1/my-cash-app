import express, {Express, Request, Response, NextFunction} from 'express';
const app: Express = express();

// Middleware
app.use(express.json());

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