import { getQuery, getQueryError } from '@fauna/query';
import { getClient } from '@lib/fauna';
import {
  Collection,
  Create,
  Delete,
  Do,
  Equals,
  Exists,
  Get,
  If,
  Index,
  Let,
  Match,
  Select,
  Var
} from 'faunadb';
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
  async RemoveResponse(
    userToken: string,
    projectid: string,
    formid: string,
    responseId: string
  ): Promise<QueryManager<null>> {
    return getClient(userToken)
      .query(
        Let(
          {
            formDoc: Get(Match(Index('forms_by_id'), formid)),
            docProjectId: Select(['data', 'projectid'], Var('formDoc'))
          },
          If(
            Equals(Var('docProjectId'), projectid),
            Let(
              {
                responseDoc: Get(Match(Index('responses_by_id'), responseId)),
                rDocFormId: Select(['data', 'formid'], Var('responseDoc'))
              },
              If(
                Equals(Var('rDocFormId'), formid),
                Do(Delete(Select(['ref'], Var('responseDoc'))), {
                  error: false,
                  code: 200,
                  description: 'Successfully removed response.'
                }),
                {
                  error: true,
                  code: 404,
                  description: 'Unknown Form'
                }
              )
            ),
            { error: true, code: 404, description: 'Unknown Project' }
          )
        )
      )
      .then((r: QueryManager<null>) => r)
      .catch((e) => getQueryError(e));
  }
}
