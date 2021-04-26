import { FAUNA_SECRET, setupClient, executeFQL } from './fql.js';
import { handleSetupError } from './helpers.js';
import { createCollections, createIndex } from './collections.js';
import { CreateNormalUserRole } from './roles.js';

async function setupDatabase() {
  if (!FAUNA_SECRET) {
    console.error(
      '\n [!] Please set the `FAUNADB_SECRET_KEY` in you .env or environment variables.\n'
    );
    process.exit(1);
  }

  // create collection
  const cols = await handleSetupError(createCollections(setupClient), 'user collection');
  if (cols) {
    await handleSetupError(createIndex(setupClient), 'user index', 'user index');
  }

  // create the role
  await executeFQL(setupClient, CreateNormalUserRole, 'normal user role');
}

setupDatabase();
