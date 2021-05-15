import { ResponsesModel } from '@fauna/models/responses';
import { joinString } from '@lib/utils';
import methodHandler from '@middleware/methods';
import { nanoid } from 'nanoid';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ResponseProps } from '~types/response';

const formApiBackend = async (req: NextApiRequest, res: NextApiResponse) => {
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
    formid: joinString(formid)
  };

  const p = new ResponsesModel();
  const q = await p.NewResponse(newData);

  res
    .status(q.code)
    .json(q.error ? q : { error: false, code: 200, description: 'Response has been submitted!' });
};

export default methodHandler(formApiBackend, ['POST', 'PUT']);
