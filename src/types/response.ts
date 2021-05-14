import { DataProps } from '@ootiq/just-faunautils/lib/utils';
import { Expr } from 'faunadb';

interface ResponseProps {
  formRef: Expr;
  id: string;
  data: DataProps;
}

export type { ResponseProps };
