import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { FormsModel } from '@fauna/models/forms';
import { getUserToken } from '@fauna/models/user-model';
import { parseBodyData } from '@lib/parse-body';
import methodHandler from '@middleware/methods';
import type { NextApiRequest, NextApiResponse } from 'next';
import { UpdateFormPropsSchema, BaseFormProps } from '~types/forms';

const updateForms = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = await parseBodyData(req, UpdateFormPropsSchema);

  if (!body[0]) {
    res.status(400).json({
      error: true,
      code: 400,
      description: body[1]
    });
    return;
  }

  const token = getUserToken(req, res);

  const data: BaseFormProps = {
    name: body[1].name,
    description: body[1].description
  };

  const p = new FormsModel(token);
  const q = await p.UpdateForm(data, body[1].formid);

  res.status(q.code).json(q);
};

export default methodHandler(withApiAuthRequired(updateForms), ['POST', 'PUT']);
