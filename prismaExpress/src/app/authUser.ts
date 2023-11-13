import { Request} from 'express';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv'; config();

const JWT_SECRET = process.env.JWTSECRET || "SECRET";

export const isAuthenticated = async (req: Request): Promise<{ auth: boolean; message: string } | undefined> => {
  let token = null;
  const bearerToken: string | undefined = req.header('Authorization');
  if (bearerToken) {
    token = bearerToken.split(" ")[1];
  }

  if (!token) {
    return {
      auth: false,
      message: 'Token de acceso no proporcionado' + token
    };
  }

  try {
    const user = await verifyToken(token);
    return {
      auth: true,
      message: user
    };
  } catch (err) {
    return {
      auth: false,
      message: 'Token de acceso inválido' + " " + err + " " + token
    };
  }
};

const verifyToken = (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
};
