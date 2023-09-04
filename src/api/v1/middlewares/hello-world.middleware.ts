import { NextFunction, Response } from "express";
import * as jwt from 'jsonwebtoken';
import { UserModel } from "../models";
import { GetUserAuthInfoRequestInterface } from "../interfaces";

export const isAuthorized = async (req: GetUserAuthInfoRequestInterface, res: Response, next: NextFunction): Promise<void> => {
  const accessToken = req?.headers?.authorization;
  const { ACCESS_TOKEN_SECRET } = process.env;
  if (accessToken) {
    try {
      const embeddedPayloadFromJwt = <jwt.JwtPayload>jwt.verify(
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
      res
        .status(401)
        .json({
          success: false,
          message: error.message,
          data: null
        });
    }
  } else {
    res
      .status(401)
      .json({
        success: false,
        message: 'Unauthorized access',
        data: null
      });
  }
};