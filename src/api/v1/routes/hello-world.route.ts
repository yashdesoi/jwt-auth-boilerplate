import express, { NextFunction, Response } from 'express';
import { GetUserAuthInfoRequestInterface } from '../shared';

const router = express.Router();

router.get('/', (req: GetUserAuthInfoRequestInterface, res: Response, next: NextFunction) => {
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
