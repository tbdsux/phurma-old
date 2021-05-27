import { FaunaResponseProps } from '@ootiq/just-faunautils';
import { Expr } from 'faunadb';
import Joi from 'joi';
import { ResponseProps } from './response';

interface BaseFormProps {
  name: string;
  description: string;
}

// main form info props
interface FormProps extends BaseFormProps {
  id: string;
  createdDate: string;
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

/**
 * Schema validation props. Used for validating the request body.
 */
interface FormSchemaProps extends BaseFormProps {
  projectid: string;
  formid?: string;
}
const FormPropsSchema = Joi.object<FormSchemaProps>().keys({
  name: Joi.string().min(3).required(),
  projectid: Joi.string().required(), // this is added automatically by the ui
  description: Joi.string().allow('')
});
const CreateFormPropsSchema = FormPropsSchema.keys();
const UpdateFormPropsSchema = FormPropsSchema.keys({
  name: Joi.string().min(3),
  formid: Joi.string().required()
});

export type { FormProps, FormPropsById, BaseFormProps };
export { CreateFormPropsSchema, UpdateFormPropsSchema };
