import { getQuery, getQueryError } from '@fauna/query';
import { Count, CurrentIdentity, Index, Let, Match, Paginate, Select, Var } from 'faunadb';
import { QueryManager } from '~types/query';
import { UserStatsProps } from '~types/stats';
import { BaseModel } from './base-model';

export class StatsModel extends BaseModel {
  constructor(token: string) {
    super(token);
  }

  async GetAllNumbers(): Promise<QueryManager<UserStatsProps>> {
    return this._client
      .query(
        Let(
          {
            projects: Count(
              Paginate(Match(Index('projects_document_by_owner'), CurrentIdentity()))
            ),
            forms: Count(Paginate(Match(Index('forms_document_by_owner'), CurrentIdentity())))
          },
          {
            total: {
              projects: Select(['data', 0], Var('projects')),
              forms: Select(['data', 0], Var('forms'))
            }
          }
        )
      )
      .then((r: UserStatsProps) => getQuery(r))
      .catch((e) => getQueryError(e));
  }
}
