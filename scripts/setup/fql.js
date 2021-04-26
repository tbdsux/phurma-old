import dotenv from 'dotenv';
dotenv.config({ path: '../.env.local' });

import faunadb from 'faunadb';
import { handleSetupError } from './helpers.js';

// Get the SECRET from the process.env
export const FAUNA_SECRET = process.env.FAUNADB_SECRET_KEY;

// Create a New Client
const getClient = (secret) => {
  return new faunadb.Client({ secret });
};

export const setupClient = getClient(FAUNA_SECRET);

const q = faunadb.query;
const {
  Exists,
  If,
  Delete,
  Update,
  CreateFunction,
  CreateRole,
  Role,
  AccessProvider,
  CreateAccessProvider,
  Index
} = q;

// Some minor wrapper to execute FQL and at the same time log a statement.
// and handle errors. We mainly use to provide a cleaner setup script progress and errors.
function executeFQL(client, FQL, log) {
  return handleSetupError(client.query(FQL), log);
}

// Some minor FQL extensions to make our live easier
function DeleteIfExists(ref) {
  return If(Exists(ref), false, Delete(ref));
}

function IfNotExists(ref, FqlCode) {
  return If(Exists(ref), false, FqlCode);
}

// A convenience function to either create or update a function.
function CreateOrUpdateFunction(obj) {
  return If(
    Exists(q.Function(obj.name)),
    Update(q.Function(obj.name), { body: obj.body, role: obj.role }),
    CreateFunction({ name: obj.name, body: obj.body, role: obj.role })
  );
}

// A convenience function to either create or update a role.
function CreateOrUpdateRole(obj) {
  return If(
    Exists(Role(obj.name)),
    Update(Role(obj.name), { membership: obj.membership, privileges: obj.privileges }),
    CreateRole(obj)
  );
}

function CreateOrUpdateProvider(obj, name) {
  return If(
    Exists(AccessProvider(name || obj.name)),
    Update(AccessProvider(name || obj.name), obj),
    CreateAccessProvider(obj)
  );
}

function CreateIndex(obj) {
  return If(
    Exists(Index(obj.name)),
    Update(Index(obj.name), { terms: obj.terms, values: obj.values }),
    CreateIndex(obj)
  );
}

export {
  executeFQL,
  DeleteIfExists,
  IfNotExists,
  CreateOrUpdateFunction,
  CreateOrUpdateRole,
  CreateOrUpdateProvider,
  CreateIndex
};
