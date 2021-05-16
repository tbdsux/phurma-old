import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { ProjectModel } from '@fauna/models/projects';
import { getUserToken } from '@fauna/models/user-model';
import { parseBodyData } from '@lib/parse-body';
import methodHandler from '@middleware/methods';
import type { NextApiRequest, NextApiResponse } from 'next';
import { BaseProjectProps, UpdateProjectPropsSchema } from '~types/projects';

const updateProject = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = await parseBodyData(req, UpdateProjectPropsSchema);

  if (!body[0]) {
    res.status(400).json({
      error: true,
      code: 400,
      description: body[1]
    });
    return;
  }

  const token = getUserToken(req, res);

  const data: BaseProjectProps = {
    name: body[1].name
  };

  const p = new ProjectModel(token);
  const q = await p.UpdateProject(data, body[1].refid);

  res.status(q.code).json(q);
};

export default methodHandler(withApiAuthRequired(updateProject), ['POST', 'PUT']);
