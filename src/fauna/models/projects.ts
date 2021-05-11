import { getQuery, getQueryError } from '@fauna/query';
import { CreateData, FaunaResponseProps, getClient } from '@ootiq/just-faunautils';
import { Client, CurrentIdentity, Get, Lambda, Map, Match, Paginate, Var, Index } from 'faunadb';
import { ProjectProps } from '~types/projects';
import { QueryManager } from '~types/query';

export class ProjectModel {
  _client: Client;

  constructor(token: string) {
    this._client = getClient(token);
  }

  // for creating new projects
  async CreateNewProject(data: ProjectProps): Promise<QueryManager<ProjectProps>> {
    return this._client
      .query(
        CreateData('projects', {
          owner: CurrentIdentity(),
          ...data
        })
      )
      .then((r: FaunaResponseProps<ProjectProps>) => getQuery(r.data))
      .catch((e) => getQueryError(e));
  }

  // for fetching projects
  async FetchProjects(): Promise<QueryManager<FaunaResponseProps<ProjectProps>[]>> {
    return this._client
      .query(
        Map(
          Paginate(Match(Index('projects_by_userRef'), CurrentIdentity())),
          Lambda(['date', 'ref'], Get(Var('ref')))
        )
      )
      .then((r: FaunaResponseProps<FaunaResponseProps<ProjectProps>[]>) => getQuery(r.data))
      .catch((e) => getQueryError(e));
  }
}
