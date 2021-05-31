import { DashFooter } from '@components/dashboard/footer';
import { DashHeader } from '@components/dashboard/header';
import BaseLayout, { LayoutProps } from './base';

type DashLayoutProps = LayoutProps;

export const DashLayout = ({ pageTitle, children }: DashLayoutProps) => {
  return (
    <BaseLayout pageTitle={pageTitle}>
      <DashHeader />

      <div className="py-10 w-5/6 sm:w-4/5 lg:w-3/4 xl:w-2/3 mx-auto">{children}</div>

      <DashFooter />
    </BaseLayout>
  );
};
