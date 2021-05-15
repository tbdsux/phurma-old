import { DataProps } from '@ootiq/just-faunautils/lib/utils';

interface ResponseProps {
  formid: string;
  id: string;
  data: DataProps;
  createdDate: string;
}

export type { ResponseProps };
