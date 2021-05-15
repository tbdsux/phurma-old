import { DataProps } from '@ootiq/just-faunautils/lib/utils';

type SubmissionMark = 'verified' | 'spam';

interface ResponseProps {
  formid: string;
  id: string;
  data: DataProps;
  createdDate: string;
  mark?: SubmissionMark; // TODO: implement spam autodetection
}

export type { ResponseProps };
