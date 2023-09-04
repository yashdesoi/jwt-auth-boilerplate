import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../models';
import { getAccessToken, isPasswordValid } from '../helpers';

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userDocument = await UserModel.create(req.body);
    res
      .status(200)
      .json({
        success: true,
        message: null,
        data: userDocument
      });
  } catch (error: any) {
    res
      .status(400)
      .json({
        success: false,
        message: error?.message,
        data: null
      });
  }
};

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const userDocument = await UserModel.findOne({ email });
    if (!email) {
      throw new Error('Email is required');
    }
    if (!userDocument || !(await isPasswordValid(password, userDocument.password))) {
      throw new Error('Incorrect email or password');
    }
    const accessToken = getAccessToken({
      mongoDbUserId: userDocument._id.toString()
    });
    res
      .status(200)
      .json({
        success: true,
        message: null,
        data: { accessToken }
      });
  } catch(error: any) {
    res
    .status(401)
    .json({
      success: false,
      message: error?.message,
      data: null
    });
  }
  

  
};
