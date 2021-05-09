import { ObjectSchema } from 'joi';
import { NextApiRequest } from 'next';

const parseBodyData = async (req: NextApiRequest, schema: ObjectSchema) => {
  const body = req.body;

  return await schema
    .validateAsync(body)
    .then((r) => [true, r])
    .catch((e) => [false, e.details[0].message]);
};

export { parseBodyData };
