import { NextFunction, Response } from "express";
import * as jwt from 'jsonwebtoken';
import { UserModel } from "../mongoose-models";
import { GetUserAuthInfoRequestInterface } from "../interfaces";
import { AccessTokenPayloadInterface } from "../interfaces/access-token-payload.interface";
import { CustomErrorModel } from "../ts-models";

export const isAuthorized = async (req: GetUserAuthInfoRequestInterface, res: Response, next: NextFunction): Promise<void> => {
  const accessToken = req?.headers?.authorization;
  const { ACCESS_TOKEN_SECRET } = process.env;
  if (accessToken) {
    try {
      const embeddedPayloadFromJwt = <AccessTokenPayloadInterface>jwt.verify(
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
      next(new CustomErrorModel(error.message, 401));
    }
  } else {
    next(new CustomErrorModel('Unauthorized access', 401));
  }
};