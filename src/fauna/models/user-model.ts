import { adminClient, getClient, q } from '@lib/fauna';

type GetTokenRespProps = {
  ref: object;
  ts: number;
  instance: object;
  secret: string;
};

export class UserModel {
  async obtainFaunaDBToken(user) {
    return adminClient
      .query(
        q.Create(q.Tokens(), {
          instance: q.Select('ref', q.Get(q.Match(q.Index('user_by_id'), user)))
        })
      )
      .then((res: GetTokenRespProps) => res?.secret) // return only the secret
      .catch((e) => console.error(e));
  }

  async invalidateFaunaDBToken(token) {
    await getClient(token)
      .query(q.Logout(true))
      .catch((e) => console.error(e));
  }
}
