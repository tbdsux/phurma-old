import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { ProjectModel } from '@fauna/models/projects';
import { getUserToken } from '@fauna/models/user-model';
import { parseBodyData } from '@lib/parse-body';
import methodHandler from '@middleware/methods';
import { nanoid } from 'nanoid';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ProjectProps, ProjectPropsSchema } from '~types/projects';
import { QueryManager } from '~types/query';

const createNewProject = async (
  req: NextApiRequest,
  res: NextApiResponse<QueryManager<ProjectProps>>
) => {
  const body = await parseBodyData(req, ProjectPropsSchema);

  if (!body[0]) {
    res.status(400).json({
      error: true,
      code: 400,
      description: body[1]
    });
    return;
  }

  const token = getUserToken(req, res);

  const data: ProjectProps = {
    createdDate: new Date().toISOString(),
    id: nanoid(25),
    ...body[1]
  };

  const p = new ProjectModel(token);
  const q = await p.CreateNewProject(data);

  res.status(q.code).json(q);
};

export default methodHandler(withApiAuthRequired(createNewProject), ['PUT', 'POST']);
