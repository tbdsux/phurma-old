import { useUser } from '@auth0/nextjs-auth0';

import Layout from '@components/Layout';
import { LinkButton } from '@components/shared/LinkButton';

export default function Index() {
  const { user } = useUser();

  return (
    <Layout pageTitle="Home | Nextjs, FaunaDB and Auth0">
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-6xl font-black tracking-wide mb-8">NextJS, FaunaDB w/ Auth0</h3>
          <p className="text-2xl">start coding!</p>

          <hr className="my-8" />

          {user ? (
            <>
              <div>{JSON.stringify(user)}</div>
              <div className="mt-8">
                <LinkButton
                  href="/api/auth/logout"
                  className="hover:underline p-2 bg-gray-500 text-white hover:bg-gray-600"
                >
                  Log Out
                </LinkButton>
              </div>
            </>
          ) : (
            <div className="inline-flex">
              <LinkButton
                href="/api/auth/login"
                className="text-lg bg-gray-500 hover:bg-gray-600 text-white py-2 px-4"
              >
                Login
              </LinkButton>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
