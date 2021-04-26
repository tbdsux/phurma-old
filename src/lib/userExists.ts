/*
  This is a helper script for an alternative user creation without using Auth0 rules.
*/

import { UserProfile } from '@auth0/nextjs-auth0';
import { adminClient, q } from './fauna';

const { If, Exists, Match, Index, Create, Collection } = q;

const CreateUserIfNotExists = (user: UserProfile) => {
  return adminClient.query(
    If(
      Exists(Match(Index('user_by_id'), user.sub)),
      true,
      Create(Collection('users'), {
        data: {
          user: user.sub,
          picture: user.picture,
          name: user.name
        }
      })
    )
  );
};

export { CreateUserIfNotExists };
