import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import methodHandler from '@middleware/methods';
import { getUserProjects } from '@functions/getProject';
import type { NextApiRequest, NextApiResponse } from 'next';

const fetchProjects = async (req: NextApiRequest, res: NextApiResponse) => {
  const q = await getUserProjects(req, res);

  res.status(q.code).json(q);
};

export default methodHandler(withApiAuthRequired(fetchProjects), ['GET']);
