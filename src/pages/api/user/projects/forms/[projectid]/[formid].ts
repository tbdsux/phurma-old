import type { NextApiRequest, NextApiResponse } from 'next';

import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { FormsModel } from '@fauna/models/forms';
import { getUserToken } from '@fauna/models/user-model';
import { joinString } from '@lib/utils';
import methodHandler from '@middleware/methods';

import { FormPropsById } from '~types/forms';
import { QueryManager } from '~types/query';

const fetchProjects = async (
  req: NextApiRequest,
  res: NextApiResponse<QueryManager<FormPropsById>>
) => {
  /**
   * Note: projectid -> could be either the generated id or the ref id
   */
  const { projectid, formid } = req.query;

  // get token
  const token = getUserToken(req, res);

  //
  const p = new FormsModel(token);
  let q = <QueryManager<FormPropsById | null>>{};

  if (req.method === 'GET') {
    /* GET method */
    q = await p.FetchFormById(joinString(projectid), joinString(formid));
  } else if (req.method === 'DELETE') {
    /* DELETE method */
    q = await p.DeleteForm(joinString(projectid), joinString(formid));
  }

  res.status(q.code).json(q);
};

export default methodHandler(withApiAuthRequired(fetchProjects), ['GET', 'DELETE']);
