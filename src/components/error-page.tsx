import { DashLayout } from '@layouts/DashLayout';
import Error from 'next/error';

type ErrorPageComponentProps = {
  code: number;
  title: string;
};

export const ErrorPageComponent = ({ code, title }: ErrorPageComponentProps) => {
  return (
    <DashLayout pageTitle={title}>
      <Error statusCode={code} />
    </DashLayout>
  );
};
