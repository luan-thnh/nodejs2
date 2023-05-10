import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/users_model';
import jwt from 'jsonwebtoken';

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token: any = req.headers.authorization;

  try {
    if (!token)
      return res.status(401).json({ message: 'Unauthorized: missing token' });

    let verifyObj: any = await jwt.verify(token, 'auth1');

    let user = await UserModel.findByPk(verifyObj.userId);

    if (!user)
      return res.status(401).json({ message: 'Unauthorized: user not found' });

    if (user.token !== token)
      return res.status(401).json({ message: 'Unauthorized: invalid token' });

    next();
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: ' + error.message });
    } else {
      return res
        .status(401)
        .json({ message: 'Unauthorized: ' + String(error) });
    }
  }
}
