import { Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv'; config();

const JWT_SECRET: any = process.env.JWTSECRET;

export const requiresAuthentication = async (
  req: Request, 
  res: Response, 
  next: NextFunction
  ): Promise<void> => {
    try {
      const token = extractToken(req);

      if (!token) { throw new Error('Token de acceso no proporcionado'); }
  
      const user = await verifyToken(token);
      res.locals.user = user;
      next();
      
    } catch (error: any) {
      res.status(401).json({
        auth: false,
        message: `Autenticación fallida: ${error.message}`,
      });
    }
  };


const extractToken = (req: Request): string | null => {
  const bearerToken: string | undefined = req.header('Authorization');
  return bearerToken ? bearerToken.split(' ')[1] : null;
};


const verifyToken = (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
      if (err) {
        reject(new Error("Token de acceso inválido"));
      } else {
        resolve(user);
      }
    });
  });
};
