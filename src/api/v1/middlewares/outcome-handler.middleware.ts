import { NextFunction, Request, Response } from 'express';
import { ErrorHandlingModel, SuccessHandlingModel } from '../shared/models';
import { IResponseData } from '../shared/interfaces';

export const outcomeHandler = (result: SuccessHandlingModel | ErrorHandlingModel, req: Request, res: Response, next: NextFunction) => {
  if (result instanceof SuccessHandlingModel) {
    res
      .status(result.statusCode)
      .json(<IResponseData>{
        success: true,
        message: null,
        data: result.data
      });
  } else if (result instanceof ErrorHandlingModel) {
    res
      .status(result.statusCode)
      .json(<IResponseData>{
        success: false,
        message: result.message,
        data: null
      });
  }
  next();
};
