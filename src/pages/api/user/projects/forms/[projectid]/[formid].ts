import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { FormsModel } from '@fauna/models/forms';
import { getUserToken } from '@fauna/models/user-model';
import { joinString } from '@lib/utils';
import methodHandler from '@middleware/methods';
import type { NextApiRequest, NextApiResponse } from 'next';
import { FormPropsById } from '~types/forms';
import { QueryManager } from '~types/query';

const fetchProjects = async (
  req: NextApiRequest,
  res: NextApiResponse<QueryManager<FormPropsById>>
) => {
  const { projectid, formid } = req.query;

  const token = getUserToken(req, res);

  const p = new FormsModel(token);
  const q = await p.FetchFormById(joinString(projectid), joinString(formid));

  res.status(q.code).json(q);
};

export default methodHandler(withApiAuthRequired(fetchProjects), ['GET']);
