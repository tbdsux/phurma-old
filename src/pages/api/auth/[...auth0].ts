import { getSession, handleAuth, handleCallback, handleLogout } from '@auth0/nextjs-auth0';
import { ObtainUserToken } from '@fauna/models/user-model';
import { CreateUserIfNotExists } from '@lib/userExists';

import { TokenLogout } from '@ootiq/just-faunautils';

/* --> ALTERNATIVE w/out using Auth0 Rules
const afterCallback = async (req: NextApiRequest, res: NextApiResponse, session, state) => {
  return await CreateUserIfNotExists(session.user).then(async () => {
    const token = await obtainFaunaDBToken(session.user.sub);
    session.user.token = token;
    return session;
  });
};
*/

const afterCallback = async (req, res, session, state) => {
  return await CreateUserIfNotExists(session.user).then(async () => {
    const token = await ObtainUserToken(session.user.sub);

    if (!token) {
      throw new Error('There was a problem during authentication.');
    }

    session.user.token = token;
    return session;
  });
};

export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res, { afterCallback });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  },
  async logout(req, res) {
    try {
      // NOTE: I am not sure about this process, if this is right
      // invalidate token first
      const { user } = getSession(req, res);
      await TokenLogout(user.token, true);

      // then, logout
      await handleLogout(req, res);
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  }
});

/*
--> new users will be automatically registered to the db using the auth0 rule
*/

/*
  NOTE: /api/auth/[...auth] -> nextjs-auth0 api router handler
*/
