import { getQuery, getQueryError } from '@fauna/query';
import { FaunaResponseProps } from '@ootiq/just-faunautils';
import { DataProps } from '@ootiq/just-faunautils/lib/utils';
import {
  Append,
  Collection,
  Create,
  CurrentIdentity,
  Do,
  Get,
  Let,
  Ref,
  Select,
  Update,
  Var,
  Map,
  Lambda,
  Paginate,
  Match,
  Index,
  Equals,
  If,
  Call,
  Function
} from 'faunadb';
import { BaseFormProps, FormProps, FormPropsById } from '~types/forms';
import { QueryManager } from '~types/query';
import { BaseModel } from './base-model';

export class FormsModel extends BaseModel {
  constructor(token: string) {
    super(token);
  }

  // creates a new form and updates the project's formRefs
  async CreateNewForm(data: DataProps, projectid: string) {
    return this._client
      .query(
        Let(
          {
            formRef: Create(Collection('forms'), {
              data: {
                owner: CurrentIdentity(),
                responseRefs: [],
                ...data
              }
            }),
            projectDoc: Get(Ref(Collection('projects'), projectid))
          },
          Do(
            Update(Ref(Collection('projects'), projectid), {
              data: {
                formRefs: Append(
                  Select(['ref'], Var('formRef')),
                  Select(['data', 'formRefs'], Var('projectDoc'))
                )
              }
            }),
            Select([], Var('formRef'))
          )
        )
      )
      .then((r: FaunaResponseProps<FormProps>) => getQuery(r.data))
      .catch((e) => getQueryError(e));
  }

  // fetch the form and the responses
  async FetchFormById(projectid: string, formid: string): Promise<QueryManager<FormPropsById>> {
    return this._client
      .query(
        Let(
          {
            formDoc: Get(Match(Index('forms_by_id'), formid)),
            projectDoc: Get(Match(Index('projects_by_id'), projectid)),
            owner: Select(['data', 'owner'], Var('formDoc')),
            formRef: Select(['ref'], Var('formDoc'))
          },
          If(
            Equals(CurrentIdentity(), Var('owner')),
            {
              ref: Var('formRef'),
              project: {
                name: Select(['data', 'name'], Var('projectDoc')),
                id: Select(['data', 'id'], Var('projectDoc')),
                refid: Select(['ref', 'id'], Var('projectDoc'))
              },
              form: Select(['data'], Var('formDoc')),
              responses: Select(
                ['data'],
                Map(
                  Paginate(Match(Index('responses_by_formid'), formid)),
                  Lambda(['date', 'responseRef'], Get(Var('responseRef')))
                )
              )
            },
            null
          )
        )
      )
      .then((r: FormPropsById | null) => {
        if (!r) {
          return {
            error: true,
            code: 404,
            desription: 'Form Not Found!'
          };
        }

        return getQuery(r);
      })
      .catch((e) => getQueryError(e));
  }

  /* for updating form */
  async UpdateForm(data: BaseFormProps, formid: string): Promise<QueryManager<FormProps>> {
    return this._client
      .query(
        Update(Ref(Collection('forms'), formid), {
          data
        })
      )
      .then((r: FaunaResponseProps<FormProps>) => getQuery(r.data))
      .catch((e) => getQueryError(e));
  }

  /* for deleting forms */
  async DeleteForm(projectRefId: string, formid: string): Promise<QueryManager<null>> {
    return this._client
      .query(Call(Function('removeForm'), [projectRefId, formid]))
      .then((r: QueryManager<null>) => r)
      .catch((e) => getQueryError(e));
  }
}
