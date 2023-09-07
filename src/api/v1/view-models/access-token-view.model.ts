import { IAccessTokenView } from './access-token-view.interface';

export class AccessTokenViewModel implements IAccessTokenView {
  constructor(public accessToken: string) {}
}
