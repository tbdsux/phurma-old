import { ResponsesModel } from '@fauna/models/responses';
import { joinString } from '@lib/utils';
import { cors } from '@middleware/cors';
import { nanoid } from 'nanoid';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ResponseProps } from '~types/response';

const formApiBackend = async (req: NextApiRequest, res: NextApiResponse) => {
  // cors
  await cors(req, res);

  // method validation
  if (!['PUT', 'POST'].includes(req.method)) {
    res.setHeader('Allow', ['PUT', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  /* submit form */

  const { formid } = req.query;
  const data = req.body;

  try {
    JSON.stringify(data);
  } catch (err) {
    res.status(400).json({ error: true, code: 400, description: 'Bad JSON body.' });
    return;
  }

  // parse response data
  const newData: ResponseProps = {
    data: data,
    id: nanoid(20),
    formid: joinString(formid),
    createdDate: new Date().toISOString()
  };

  const p = new ResponsesModel();
  const q = await p.NewResponse(joinString(formid), newData);

  res
    .status(q.code)
    .json(q.error ? q : { error: false, code: 200, description: 'Response has been submitted!' });
};

export default formApiBackend;
