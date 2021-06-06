import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { ResponsesModel } from '@fauna/models/responses';
import { getUserToken } from '@fauna/models/user-model';
import { joinString } from '@lib/utils';
import methodHandler from '@middleware/methods';
import type { NextApiRequest, NextApiResponse } from 'next';

const removeResponse = async (req: NextApiRequest, res: NextApiResponse) => {
  const { projectid, formid, responseId } = req.query;

  const token = getUserToken(req, res);

  const p = new ResponsesModel();
  const q = await p.RemoveResponse(
    token,
    joinString(projectid),
    joinString(formid),
    joinString(responseId)
  );

  res.status(q.code).json(q);
};

export default methodHandler(withApiAuthRequired(removeResponse), ['DELETE']);
