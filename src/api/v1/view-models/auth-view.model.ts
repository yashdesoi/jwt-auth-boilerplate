export interface IAccessTokenView {
  accessToken: string;
}

export class AccessTokenViewModel implements IAccessTokenView {
  constructor(public accessToken: string) {}
}
