import express, { NextFunction, Response } from 'express';
import { IGetUserAuthInfoRequest } from '../shared/interfaces';

const router = express.Router();

router.get('/', (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  const result = `
  :::    ::: :::::::::: :::        :::         ::::::::        :::       :::  ::::::::  :::::::::  :::        :::::::::  
  :+:    :+: :+:        :+:        :+:        :+:    :+:       :+:       :+: :+:    :+: :+:    :+: :+:        :+:    :+: 
  +:+    +:+ +:+        +:+        +:+        +:+    +:+       +:+       +:+ +:+    +:+ +:+    +:+ +:+        +:+    +:+ 
  +#++:++#++ +#++:++#   +#+        +#+        +#+    +:+       +#+  +:+  +#+ +#+    +:+ +#++:++#:  +#+        +#+    +:+ 
  +#+    +#+ +#+        +#+        +#+        +#+    +#+       +#+ +#+#+ +#+ +#+    +#+ +#+    +#+ +#+        +#+    +#+ 
  #+#    #+# #+#        #+#        #+#        #+#    #+#        #+#+# #+#+#  #+#    #+# #+#    #+# #+#        #+#    #+# 
  ###    ### ########## ########## ##########  ########          ###   ###    ########  ###    ### ########## #########    
  `;
  res
    .status(200)
    .contentType('text')
    .send(result);
});

export const helloWorldRoute = router;
