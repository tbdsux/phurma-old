import { getAccessToken } from '@auth0/nextjs-auth0';
import { getClient, q } from '@lib/fauna';
import { Client } from 'faunadb';
getAccessToken;

export class Posts {
  client: Client;

  constructor(token: string) {
    this.client = getClient(token);
  }

  async createNewPost() {
    return this.client.query(
      q.Create(q.Collection('posts'), {
        data: {
          owner: q.CurrentIdentity()
        }
      })
    );
  }
}
