import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../mongoose-models';
import { getAccessToken, isPasswordValid } from '../helpers';
import { ErrorHandlingModel, SuccessHandlingModel } from '../shared/models';
import { AccessTokenViewModel } from '../view-models';
import { UserDataModel } from '../data-models';

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = new UserDataModel(req.body);
    const userDocument = await UserModel.create(userData);
    next(new SuccessHandlingModel(userDocument, 200));
  } catch (error: any) {
    next(new ErrorHandlingModel(error.message, 400));
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
    next(new SuccessHandlingModel(new AccessTokenViewModel(accessToken), 200));
  } catch (error: any) {
    next(new ErrorHandlingModel(error.message, 401));
  }



};
