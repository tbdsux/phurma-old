import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { FormsModel } from '@fauna/models/forms';
import { getUserToken } from '@fauna/models/user-model';
import { parseBodyData } from '@lib/parse-body';
import methodHandler from '@middleware/methods';
import { nanoid } from 'nanoid';
import type { NextApiRequest, NextApiResponse } from 'next';
import { FormProps, FormPropsSchema } from '~types/forms';
import { QueryManager } from '~types/query';

const createNewForm = async (
  req: NextApiRequest,
  res: NextApiResponse<QueryManager<FormProps>>
) => {
  const body = await parseBodyData(req, FormPropsSchema);

  if (!body[0]) {
    res.status(400).json({
      error: true,
      code: 400,
      description: body[1]
    });
    return;
  }

  const token = getUserToken(req, res);

  const data: FormProps = {
    createdDate: new Date().toISOString(),
    id: nanoid(8),
    ...body[1]
  };

  const p = new FormsModel(token);
  const q = await p.CreateNewForm(data, body[1].projectid);

  res.status(q.code).json(q);
};

export default methodHandler(withApiAuthRequired(createNewForm), ['PUT', 'POST']);
