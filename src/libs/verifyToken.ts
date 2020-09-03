import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface IPayload{
	_id: string;
	iat: number;
	exp: number;
}

export const TokenValidation = (req: Request, res: Response, next: NextFunction ) => {
	console.log(req.cookies);
	const token = req.cookies.auth_token;
	if(!token) return res.status(401).json('Access Denied');

	try{
		const payload = jwt.verify(token, process.env.SECRET_KEY || 'TestToken') as IPayload;
		req.userId = payload._id; 

		next();
	}catch(error){
		return res.status(403).json('Token Denied');
	}
	
}