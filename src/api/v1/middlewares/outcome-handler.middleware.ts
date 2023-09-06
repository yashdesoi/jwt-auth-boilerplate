import { NextFunction, Request, Response } from "express";
import { CustomErrorModel, CustomSuccessModel } from "../ts-models";

export const outcomeHandler = (result: CustomSuccessModel | CustomErrorModel, req: Request, res: Response, next: NextFunction) => {
  if (result instanceof CustomSuccessModel) {
    res
      .status(result.statusCode)
      .json({
        success: true,
        message: null,
        data: result.data
      });
  } else if (result instanceof CustomErrorModel) {
    res
      .status(result.statusCode)
      .json({
        success: false,
        message: result.message,
        data: null
      });
  }
  next();
};
