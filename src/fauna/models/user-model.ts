import { adminClient } from '@lib/fauna';
import { AuthTokenByIndex } from '@ootiq/just-faunautils';

type GetTokenRespProps = {
  ref: object;
  ts: number;
  instance: object;
  secret: string;
};

const ObtainUserToken = async (usersub: string): Promise<string | undefined> => {
  return await adminClient
    .query(AuthTokenByIndex('user_by_id', usersub))
    .then((r: GetTokenRespProps) => r.secret)
    .catch(() => undefined);
};

export { ObtainUserToken };
