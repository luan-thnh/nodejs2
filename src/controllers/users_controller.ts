import { Request, Response } from 'express';
import UserModel from '../models/users_model';

class UserController {
  async index(req: Request, res: Response) {
    try {
      const users = await UserModel.find({});
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ message: 'Err!!' });
    }
  }

  async show(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const users = await UserModel.findById(id);
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ message: 'Err!!' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      let userNew = await UserModel.create({
        name: req.body.name,
        email: req.body.email,
      });
      res.status(200).json({ userNew });
    } catch (error) {
      res.status(500).json({ message: 'Err!!' });
    }
  }
  async update(req: Request, res: Response) {
    const id = req.params.id;
    const { name, email } = req.body;

    try {
      const user = await UserModel.findByIdAndUpdate(
        id,
        { name, email },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: 'Error' });
    }
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const user = await UserModel.findByIdAndDelete(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error' });
    }
  }
}

export default new UserController();
