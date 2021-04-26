import { ReactNode } from 'react';
import Head from 'next/head';

type LayoutProps = { pageTitle: string; children: ReactNode };

const Layout = ({ pageTitle, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <main>{children}</main>
    </>
  );
};

export default Layout;
