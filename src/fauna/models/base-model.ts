import { getClient } from '@ootiq/just-faunautils';
import { Client } from 'faunadb';

export class BaseModel {
  _client: Client;

  constructor(token: string) {
    this._client = getClient(token);
  }
}
