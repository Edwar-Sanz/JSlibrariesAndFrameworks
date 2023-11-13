import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { config } from 'dotenv'; config();
import { isAuthenticated } from '../app/authUser';


const prisma = new PrismaClient();
const ROUNDS =  process.env.ROUNDS || 10;


class UserController {

  //---------------------------------------------------------------
  async getAllUsers(req: Request, res: Response) {
    const autho = await isAuthenticated(req);
    if (autho?.auth == false) {
      return res.status(401).json({ 
        message: autho.message 
      
      });
    }
    console.log("usuario autenticado", autho?.message);
    const users = await prisma.user.findMany();
    res.json(users);
  }

  //---------------------------------------------------------------
  async getUserById(req: Request, res: Response) {
    //----------data------------
    const { id } = req.params;
    //----------find----------
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    //---------res--------------
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  }

  //---------------------------------------------------------------
  async createUser(req: Request, res: Response) {
    //----------data------------
    const { name } = req.body;
    const password: string = await bcrypt.hash(req.body.password, ROUNDS)
    //----------create----------
    const newUser = await prisma.user.create({
      data: { name, password },
    });
    //---------res--------------
    res.json(newUser);
  }

  //---------------------------------------------------------------
  async updateUser(req: Request, res: Response) {
    //----------data------------
    const { id } = req.params;
    const { name } = req.body;
    //---------update-----------
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { name },
    });
    //---------res--------------
    res.json(updatedUser);
  }

  //---------------------------------------------------------------
  async deleteUser(req: Request, res: Response) {
    //----------data------------
    const { id } = req.params;
    //---------update-----------
    const deletedUser = await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    //---------res--------------
    res.json(deletedUser);
  }
}

export default UserController;
