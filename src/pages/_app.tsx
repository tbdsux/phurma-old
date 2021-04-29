import { UserProvider } from '@auth0/nextjs-auth0';
import type { AppProps } from 'next/app';

import '../styles/tailwind.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
