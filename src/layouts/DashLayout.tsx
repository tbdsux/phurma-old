import { DashFooter } from '@components/dashboard/footer';
import { DashHeader } from '@components/dashboard/header';
import BaseLayout, { LayoutProps } from './base';

interface DashLayoutProps extends LayoutProps {}

export const DashLayout = ({ pageTitle, children }: DashLayoutProps) => {
  return (
    <BaseLayout pageTitle={pageTitle}>
      <DashHeader />

      <div className="py-10 w-2/3 mx-auto">{children}</div>

      <DashFooter />
    </BaseLayout>
  );
};
