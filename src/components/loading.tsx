import { DashLayout } from '@layouts/DashLayout';

type LoadingComponentProps = {
  message: string;
};

export const LoadingComponent = ({ message }: LoadingComponentProps) => {
  return (
    <DashLayout pageTitle="Loading... | phurma">
      <p className="py-10 text-center tracking-wide text-gray-600">{message}</p>
    </DashLayout>
  );
};
