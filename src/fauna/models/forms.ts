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
  Var
} from 'faunadb';
import { FormProps } from '~types/forms';
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
}
