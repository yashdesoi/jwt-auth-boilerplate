export interface IUserData {
  email: string,
  password: string
}

export class UserDataModel implements Partial<IUserData> {
  email: string;
  password:  string;
  constructor(reqBody: Record<string, string>) {
    this.email = reqBody?.email || '';
    this.password = reqBody?.password || '';
  }
}