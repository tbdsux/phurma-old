import { getQuery, getQueryError } from '@fauna/query';
import { ObjectProps } from '@lib/utils';
import { CreateData, FaunaResponseProps, getClient } from '@ootiq/just-faunautils';
import { Client } from 'faunadb';
import { ProjectProps } from '~types/projects';
import { QueryManager } from '~types/query';

export class ProjectModel {
  _client: Client;

  constructor(token: string) {
    this._client = getClient(token);
  }

  async CreateNewProject(data: ProjectProps): Promise<QueryManager<ProjectProps>> {
    return this._client
      .query(CreateData('projects', data))
      .then((r: FaunaResponseProps<ProjectProps>) => getQuery(r.data))
      .catch((e) => getQueryError(e));
  }
}
