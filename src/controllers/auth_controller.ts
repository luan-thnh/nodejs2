import { Request, Response } from 'express';
import UserModel from '../models/users_model';
import jwt from 'jsonwebtoken';

class AuthController {
  async index(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ where: { email, password } });

      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }

      const token = jwt.sign({ email, user_id: user.id }, 'auth1');
      user.token = token;

      await user.save();
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Error!' });
    }
  }
}

export default new AuthController();
