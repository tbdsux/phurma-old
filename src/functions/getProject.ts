import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingMessage, ServerResponse } from 'node:http';

import { getUserToken } from '@fauna/models/user-model';
import { ProjectModel } from '@fauna/models/projects';
import { ProjectProps } from '~types/projects';
import { FaunaResponseProps } from '@ootiq/just-faunautils';
import { QueryManager } from '~types/query';

export const getUserProjects = async (
  req: NextApiRequest | IncomingMessage,
  res: NextApiResponse | ServerResponse
): Promise<QueryManager<FaunaResponseProps<ProjectProps>[]>> => {
  const token = getUserToken(req, res);

  const p = new ProjectModel(token);
  return await p.FetchProjects();
};
