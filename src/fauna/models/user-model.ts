import { getSession } from '@auth0/nextjs-auth0';

import { IncomingMessage, ServerResponse } from 'node:http';

import { adminClient } from '@lib/fauna';
import { ObjectProps } from '@lib/utils';
import { AuthTokenByIndex } from '@ootiq/just-faunautils';
import { NextApiRequest, NextApiResponse } from 'next';

type GetTokenRespProps = {
  ref: ObjectProps;
  ts: number;
  instance: ObjectProps;
  secret: string;
};

const ObtainUserToken = async (usersub: string): Promise<string | undefined> => {
  return await adminClient
    .query(AuthTokenByIndex('user_by_id', usersub))
    .then((r: GetTokenRespProps) => r.secret)
    .catch(() => undefined);
};

const getUserToken = (
  req: NextApiRequest | IncomingMessage,
  res: NextApiResponse | ServerResponse
): string => {
  const { user } = getSession(req, res);
  return user.token;
};

export { ObtainUserToken, getUserToken };
