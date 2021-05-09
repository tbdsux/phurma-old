import { Expr } from 'faunadb';

// main form info props
interface FormProps {
  id: string;
  createdDate: string;
  projectRef: Expr;
  name: string;
  description: string;
}

export type { FormProps };
