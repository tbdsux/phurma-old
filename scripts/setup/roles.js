import faunadb from 'faunadb';
import { CreateOrUpdateRole } from './fql.js';

const { Collection, Index } = faunadb.query;

export const CreateNormalUserRole = CreateOrUpdateRole({
  name: 'NormalUser',
  privileges: [
    {
      resource: Collection('users'),
      actions: {
        read: true
      }
    },
    {
      resource: Index('user_by_id'),
      actions: {
        read: true
      }
    }
  ],
  membership: [
    {
      resource: Collection('users')
    }
  ]
});
