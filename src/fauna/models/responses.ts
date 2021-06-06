import { getQuery, getQueryError } from '@fauna/query';
import { getClient } from '@lib/fauna';
import { Collection, Create, Exists, If, Index, Match } from 'faunadb';
import { QueryManager } from '~types/query';
import { ResponseProps } from '~types/response';
import { BaseModel } from './base-model';

const publicToken = process.env.FAUNADB_PUBLIC_KEY;

export class ResponsesModel extends BaseModel {
  constructor() {
    super(publicToken);
  }

  /* for creating a new response */
  async NewResponse(formid: string, data: ResponseProps): Promise<QueryManager<ResponseProps>> {
    // directly create the data without validating the formid,
    // .it might be used to check if forms exists
    return this._client
      .query(
        If(
          Exists(Match(Index('forms_by_id'), formid)),
          /* create only the response if the formid exists */
          Create(Collection('responses'), {
            data
          }),
          {}
        )
      )
      .then(() => getQuery(<ResponseProps>{}))
      .catch((e) => getQueryError(e));
  }

  /* for removing a response */
  async RemoveResponse(userToken: string, projectid: string, formid: string, responseId: string) {
    return {
      projectid,
      formid,
      responseId
    };

    return getClient(userToken);
  }
}
