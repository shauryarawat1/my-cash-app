import express, {Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = express.Router();

// User registration route that gets email and password from user

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

// User login route that checks user and password and either fails to authenticate or provides a token

router.post('/login', async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        const token = jwt.sign({userId: user._id}, 'your_jwt_secret', {expiresIn: '1h'});
        res.json({token});

    } catch(error) {
        res.status(500).json({message: "Error logging in"});
    }
});

export default router;