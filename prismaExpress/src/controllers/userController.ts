import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { config } from 'dotenv'; config();

const prisma = new PrismaClient();
const ROUNDS =  Number(process.env.ROUNDS)


class UserController {

  //---------------------------------------------------------------
  async getAllUsers(req: Request, res: Response) {
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
    try {
      const { name, password } = req.body;
      if (name && password) {
        //--------validate existing--------------
        const existingUser = await prisma.user.findUnique({ where: { name }, });
        if (existingUser) { return res.status(400).json({ message: 'El usuario ya existe' }); }
    
        //------register if not existing---------
        const hashedPassword = await bcrypt.hash(password, ROUNDS);
        const newUser = await prisma.user.create({ data: { name, password: hashedPassword },});
        return res.status(200).json({
          user: newUser,
          message: 'Creado correctamente' 
        });
      }
      return res.status(400).json({ message: 'Solicitud incorrecta, faltan datos, requeridos-> name, password' });
      
    } catch (error: any) {
      res.status(400).json({ message: `No se pudo procesar la solicitud, ERROR: ${error.message}` });
    }
    
  }

  //---------------------------------------------------------------
  async updateUser(req: Request, res: Response) {
    //----------data------------
    const { id } = req.params;
    let { name, password } = req.body;
    password = await bcrypt.hash(req.body.password, ROUNDS)
    //---------update-----------
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { name, password },
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
