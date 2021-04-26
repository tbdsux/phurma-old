import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { Posts } from '@fauna/models/posts';
import type { NextApiRequest, NextApiResponse } from 'next';

const api = withApiAuthRequired(async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = getSession(req, res);

  const p = new Posts(user.token);
  const q = await p.createNewPost();

  res.end('created');
});

export default api;
