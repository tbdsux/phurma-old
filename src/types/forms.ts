import { Expr } from 'faunadb';
import Joi from 'joi';

// main form info props
interface FormProps {
  id: string;
  createdDate: string;
  name: string;
  description: string;
  owner?: Expr;
  responseRefs?: Expr[];
}

const FormPropsSchema = Joi.object({
  name: Joi.string().min(3).required(),
  projectid: Joi.string().required(),
  description: Joi.string().min(3).required()
});

export type { FormProps };
export { FormPropsSchema };
