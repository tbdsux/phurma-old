import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { ProjectModel } from '@fauna/models/projects';
import { getUserToken } from '@fauna/models/user-model';
import { joinString } from '@lib/utils';
import methodHandler from '@middleware/methods';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ProjectByIdProps } from '~types/projects';
import { QueryManager } from '~types/query';

const fetchSpecificProject = async (
  req: NextApiRequest,
  res: NextApiResponse<QueryManager<ProjectByIdProps>>
) => {
  const { projectid } = req.query;

  const token = getUserToken(req, res);

  const p = new ProjectModel(token);
  const q = await p.FetchProjectById(joinString(projectid));

  res.status(q.code).json(q);
};

export default methodHandler(withApiAuthRequired(fetchSpecificProject), ['GET']);
