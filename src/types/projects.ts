import { FaunaResponseProps } from '@ootiq/just-faunautils';
import { Expr } from 'faunadb';
import Joi from 'joi';
import { FormProps } from './forms';

interface BaseProjectProps {
  name: string;
}

// main project info props
interface ProjectProps extends BaseProjectProps {
  id: string; // nanoid
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

interface ProjectSchemaProps extends BaseProjectProps {
  refid?: string;
}
const ProjectsSchema = Joi.object<ProjectSchemaProps>().keys({
  name: Joi.string().min(3).required()
});

const CreateProjectPropsSchema = ProjectsSchema.keys();
const UpdateProjectPropsSchema = ProjectsSchema.keys({
  refid: Joi.string().required()
});

export type { ProjectProps, ProjectByIdProps, BaseProjectProps };
export { CreateProjectPropsSchema, UpdateProjectPropsSchema };
