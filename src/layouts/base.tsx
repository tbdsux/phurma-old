import { ReactNode } from 'react';
import Head from 'next/head';

type LayoutProps = { pageTitle: string; children: ReactNode };

const BaseLayout = ({ pageTitle, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <main className="antialiased">{children}</main>
    </>
  );
};

export default BaseLayout;
export type { LayoutProps };
