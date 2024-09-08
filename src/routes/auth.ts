import express, {Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({email, password: hashedPassword});
        await user.save();

        res.status(201).json({message: "User created successfully!"});
    } catch(error) {
        res.status(500).json({message: "Error registering user"});
    }
});

router.post('/login', async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        
    }
})