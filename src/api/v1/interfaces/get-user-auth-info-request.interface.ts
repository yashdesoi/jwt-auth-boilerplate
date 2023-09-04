import { Request } from "express";
export interface GetUserAuthInfoRequestInterface extends Request {
  user?: any;
};