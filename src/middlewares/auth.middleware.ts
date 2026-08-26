import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import userModel from '@models/users.model';

const getAuthorization = (req: RequestWithUser): string | null => {
  const cookie = req.cookies?.['Authorization'];
  if (cookie) return cookie;

  const header = req.header('Authorization');
  if (header?.startsWith('Bearer ')) return header.slice('Bearer '.length);

  return null;
};

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = getAuthorization(req);

    if (!Authorization) {
      next(new HttpException(401, 'Authentication token missing'));
      return;
    }

    if (!SECRET_KEY) {
      next(new HttpException(500, 'SECRET_KEY is not set'));
      return;
    }

    const verificationResponse = verify(Authorization, SECRET_KEY) as DataStoredInToken;
    const findUser = await userModel.findById(verificationResponse._id);

    if (findUser) {
      req.user = findUser;
      next();
    } else {
      next(new HttpException(401, 'Wrong authentication token'));
    }
  } catch {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default authMiddleware;
