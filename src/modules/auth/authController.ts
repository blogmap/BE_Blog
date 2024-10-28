import { Request, Response } from "express";
import { registerUser, loginUser, forgotPassword_Ser, resetPassword_Ser } from "./authService";

export const register = async (req: Request, res: Response) => {
    try {
        const user = await registerUser(req.body); 
        res.status(201).json(user); 
    } catch (e: unknown) {
        if (e instanceof Error) {
            res.status(400).send(e.message); 
        } else {
            res.status(500).send('Error'); 
        }
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const token = await loginUser(req.body);
        if (token) {
            res.status(200).json({ token });
        } else {
            res.status(401).json({ message: "Invalid username or password" });
        }
    } catch (e: unknown) {
        if (e instanceof Error) {
            res.status(400).send(e.message);
        } else {
            res.status(500).send('Error');
        }
    }
}

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const result = await forgotPassword_Ser(data);
        res.status(200).json({ message: 'Send Email Success', data: result });
    } catch (e: unknown) {
        if (e instanceof Error) {
            res.status(400).send(e.message);
        } else {
            res.status(500).send('Error');
        }
    }
}

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const token = req.query.token; 
        const { newPassword } = req.body; 
        
        // Kiểm tra xem token có phải là string không
        if (typeof token !== 'string') {
            return res.status(400).json({ message: 'Invalid token' });
        }

        const result = await resetPassword_Ser({ token, newPassword }); 
        res.status(200).json({ message: 'Reset Password Success', data: result });
    } catch (e: unknown) {
        if (e instanceof Error) {
            res.status(400).send(e.message);
        } else {
            res.status(500).send('Error');
        }
    }
}
