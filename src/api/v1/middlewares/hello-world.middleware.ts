import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserModel } from '../mongoose-models';
import { IGetUserAuthInfoRequest, IAccessTokenPayload } from '../shared/interfaces';
import { ErrorHandlingModel } from '../shared/models';

export const isAuthorized = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction): Promise<void> => {
  const accessToken = req?.headers?.authorization;
  const { ACCESS_TOKEN_SECRET } = process.env;
  if (accessToken) {
    try {
      const embeddedPayloadFromJwt = <IAccessTokenPayload>jwt.verify(
        accessToken,
        <string>ACCESS_TOKEN_SECRET,
      );
      const loggedInUserId = embeddedPayloadFromJwt?.mongoDbUserId;
      if (loggedInUserId) {
        const user = await UserModel.findById(loggedInUserId);
        if (user) {
          // * Adding custom property to req
          req.user = user;
          next();
        } else {
          throw new Error(`Unauthorized access`);
        }
      } else {
        throw new Error(`Unauthorized access`);
      }
    } catch(error: any) {
      next(new ErrorHandlingModel(error.message, 401));
    }
  } else {
    next(new ErrorHandlingModel('Unauthorized access', 401));
  }
};