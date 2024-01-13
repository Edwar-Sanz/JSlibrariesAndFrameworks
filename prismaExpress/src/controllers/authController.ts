import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv'; config();

const prisma = new PrismaClient();
const JWT_SECRET: any = process.env.JWTSECRET;
const ROUNDS =  Number(process.env.ROUNDS);


class AuthController {

  //-------------------------------------REGISTER--------------------------------------------------------
  async registerUser(req: Request, res: Response) {    
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

  //---------------------------------------LOGIN------------------------------------------------------
  async loginUser(req: Request, res: Response) {

    try {
      const { name, password } = req.body;
      if (name && password) {
        const user = await prisma.user.findFirst({ where: { name } });
        if (!user) { return res.status(401).json({ message: 'Usuario no encontrado' }); }
  
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) { return res.status(401).json({ message: 'Credenciales inválidas' }); }
  
        // Generar token de acceso
        const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
        return res.json({ "accessToken": accessToken });
      }
      return res.status(400).json({ message: `Solicitud incorrecta, faltan datos,  requeridos-> name, password`});
    } catch (error: any) {
      res.status(400).json({ message: `No se pudo procesar la solicitud, ERROR: ${error.message}` });
    }
  }

}

export default AuthController;
