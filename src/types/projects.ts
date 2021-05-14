import { FaunaResponseProps } from '@ootiq/just-faunautils';
import { Expr } from 'faunadb';
import Joi from 'joi';
import { FormProps } from './forms';

// main project info props
interface ProjectProps {
  id: string; // nanoid
  name: string;
  createdDate: string;
  formRefs: Expr[];
  owner?: Expr;
}

// query by id
interface ProjectByIdProps {
  ref: Expr;
  id: string;
  name: string;
  createdDate: string;
  forms: FaunaResponseProps<FormProps>[];
}

const ProjectPropsSchema = Joi.object({
  name: Joi.string().min(3).required()
});

export type { ProjectProps, ProjectByIdProps };
export { ProjectPropsSchema };
