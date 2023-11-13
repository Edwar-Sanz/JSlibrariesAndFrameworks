import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv'; config();

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWTSECRET || "SECRET";


class AuthController {

  //-------------------------------------REGISTER--------------------------------------------------------
  async registerUser(req: Request, res: Response) {
    const { name, password } = req.body;

    //--------validate existing--------------
    const existingUser = await prisma.user.findUnique({ where: { name }, });
    if (existingUser) { return res.status(400).json({ message: 'El usuario ya existe' }); }

    //------register if not existing---------
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({ data: { name, password: hashedPassword },});
    res.json({
      user: newUser,
      message: 'Creado correctamente' 
    });
  }

  //---------------------------------------LOGIN------------------------------------------------------
  async loginUser(req: Request, res: Response) {
    const { name, password } = req.body;

    const user = await prisma.user.findFirst({ where: { name } });
    if (!user) { return res.status(401).json({ message: 'Usuario no encontrado' }); }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) { return res.status(401).json({ message: 'Credenciales inválidas' }); }

    // Generar token de acceso
    const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ accessToken });
  }
}

export default AuthController;
