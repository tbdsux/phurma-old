import { Expr } from 'faunadb';
import Joi from 'joi';

// main project info props
interface ProjectProps {
  id: string; // nanoid
  name: string;
  createdDate: string;
  owner?: Expr
}

const ProjectPropsSchema = Joi.object({
  name: Joi.string().min(3).required()
});

export type { ProjectProps };
export { ProjectPropsSchema };
