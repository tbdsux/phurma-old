import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { ProjectModel } from '@fauna/models/projects';
import { getUserToken } from '@fauna/models/user-model';
import methodHandler from '@middleware/methods';
import type { NextApiRequest, NextApiResponse } from 'next';

const fetchProjects = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = getUserToken(req, res);

  const p = new ProjectModel(token);
  const q = await p.FetchProjects();

  res.status(q.code).json(q);
};

export default methodHandler(withApiAuthRequired(fetchProjects), ['GET']);
