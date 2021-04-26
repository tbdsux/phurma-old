import faunadb from 'faunadb';
import { IfNotExists } from './fql.js';

const { Collection, CreateIndex, CreateCollection, Index } = faunadb.query;

// Create `user_by_id` index
const CreateUsersByIdIndex = CreateIndex({
  name: 'user_by_id',
  unique: true,
  serialized: true,
  source: Collection('users'),
  terms: [
    {
      field: ['data', 'user']
    }
  ]
});
export async function createIndex(client) {
  return await client.query(IfNotExists(Index('user_by_id'), CreateUsersByIdIndex));
}

// Create the `users` collection
const CreateUsersCollection = CreateCollection({ name: 'users' });
export async function createCollections(client) {
  return await client.query(IfNotExists(Collection('users'), CreateUsersCollection));
}
