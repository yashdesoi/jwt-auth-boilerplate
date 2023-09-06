import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../mongoose-models';
import { getAccessToken, isPasswordValid } from '../helpers';
import { CustomErrorModel, CustomSuccessModel } from '../ts-models';

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userDocument = await UserModel.create(req.body);
    next(new CustomSuccessModel(userDocument, 200));
  } catch (error: any) {
    next(new CustomErrorModel(error.message, 400));
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
    next(new CustomSuccessModel({ accessToken }, 200));
  } catch(error: any) {
    next(new CustomErrorModel(error.message, 401));
  }
  

  
};
