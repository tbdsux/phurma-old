import BaseLayout, { LayoutProps } from './base';
import { Header } from '@components/common/header';
import { Footer } from '@components/common/footer';

interface PageLayoutProps extends LayoutProps {}

export const PageLayout = ({ pageTitle, children }: PageLayoutProps) => {
  return (
    <BaseLayout pageTitle={pageTitle}>
      <Header />

      {children}

      <Footer />
    </BaseLayout>
  );
};
