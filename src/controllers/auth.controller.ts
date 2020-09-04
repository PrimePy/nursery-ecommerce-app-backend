import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';


export const signup = async (req: Request, res: Response)=> {
	const user: IUser = new User({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	});
	user.password = await user.encryptPassword(user.password);
	const savedUser = await user.save();
	const token: string = jwt.sign({
		_id: savedUser._id
	}, process.env.SECRET_KEY || 'TestToken');

	res.cookie('auth_token', token).json(savedUser);
}

export const signin = async (req: Request, res: Response)=> {
	const user = await User.findOne({
		email: req.body.email
	}, {password: 0});
	if(!user) return res.status(400).json('Account doesn\'t exist');
	const correctPassword: boolean = await user.validatePassword(req.body.password);
	if(!correctPassword) return res.status(400).json('Password wrong');

	const token: string = jwt.sign({ _id: user._id }, process.env.SECRET_KEY || 'TestToken', { expiresIn: 60*5 });

	res.cookie('auth_token', token).json(user);
}

export const signout = (req: Request, res: Response) => {
	res.clearCookie('auth_token');
}


export const profile = async (req: Request, res: Response)=> {
	const user = await User.findById(req.userId);
	if(!user) return res.status(404).json('User not found');
	res.json(user);
}