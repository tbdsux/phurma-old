import { StatsModel } from '@fauna/models/stats';
import { getUserToken } from '@fauna/models/user-model';
import type { NextApiRequest, NextApiResponse } from 'next';

const userStats = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = getUserToken(req, res);

  const p = new StatsModel(token);
  const q = await p.GetAllNumbers();

  res.status(q.code).json(q);
};

export default userStats;
