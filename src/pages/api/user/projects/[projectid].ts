import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { ProjectModel } from '@fauna/models/projects';
import { getUserToken } from '@fauna/models/user-model';
import { joinString } from '@lib/utils';
import methodHandler from '@middleware/methods';
import type { NextApiRequest, NextApiResponse } from 'next';

const removeProject = async (req: NextApiRequest, res: NextApiResponse) => {
  const { projectid } = req.query;

  const p = new ProjectModel(getUserToken(req, res));
  const q = await p.RemoveProject(joinString(projectid));

  res.send(q);
};

export default methodHandler(withApiAuthRequired(removeProject), ['DELETE']);
