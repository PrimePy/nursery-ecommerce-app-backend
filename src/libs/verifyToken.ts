import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface IPayload{
	_id: string;
	iat: number;
	exp: number;
}

export const TokenValidation = (req: Request, res: Response, next: NextFunction ) => {

	const token = req.cookies.auth_token;
	if(!token) return res.status(401).json('Access Denied');


		jwt.verify(token, process.env.SECRET_KEY || 'TestToken', (err, payload)=> {
			if(err) return res.status(403).json('Token Denied');

			const payloadInfo = payload as IPayload;
			req.userId = payloadInfo._id; 

			next();
		});
	
}