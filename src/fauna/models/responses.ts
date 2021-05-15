import { getQuery, getQueryError } from '@fauna/query';
import { Collection, Create } from 'faunadb';
import { QueryManager } from '~types/query';
import { ResponseProps } from '~types/response';
import { BaseModel } from './base-model';

const publicToken = process.env.FAUNADB_PUBLIC_KEY;

export class ResponsesModel extends BaseModel {
  constructor() {
    super(publicToken);
  }

  async NewResponse(data: ResponseProps): Promise<QueryManager<ResponseProps>> {
    // directly create the data without validating the formid,
    // .it might be used to check if forms exists
    return this._client
      .query(
        Create(Collection('responses'), {
          data
        })
      )
      .then(() => getQuery(<ResponseProps>{}))
      .catch((e) => getQueryError(e));
  }
}
