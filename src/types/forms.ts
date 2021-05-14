import { FaunaResponseProps } from '@ootiq/just-faunautils';
import { Expr } from 'faunadb';
import Joi from 'joi';
import { ResponseProps } from './response';

// main form info props
interface FormProps {
  id: string;
  createdDate: string;
  name: string;
  description: string;
  owner?: Expr;
}

// for fetching specific formid
interface FormPropsById {
  ref: Expr;
  project: {
    name: string;
    id: string;
  };
  form: FormProps;
  responses: FaunaResponseProps<ResponseProps>[];
}

const FormPropsSchema = Joi.object({
  name: Joi.string().min(3).required(),
  projectid: Joi.string().required(),
  description: Joi.string().min(3).required()
});

export type { FormProps, FormPropsById };
export { FormPropsSchema };
