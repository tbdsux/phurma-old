import Cors from 'cors';

import initMiddleware from './init';

export const cors = initMiddleware(
  Cors({
    methods: ['POST', 'OPTIONS', 'GET'],
    origin: true
  })
);
