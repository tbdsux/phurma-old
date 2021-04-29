import { Container } from '@components/Container';
import Link from 'next/link';

export const Header = () => {
  return (
    <header className="py-4">
      <Container size="w-11/12" className="flex items-center justify-between">
        <div>
          <h1 className="font-black tracking-wide text-2xl">phurma</h1>
        </div>
        <ul>
          <li>
            <Link href="/api/auth/login?returnTo=/dashboard">
              <a className="uppercase tracking-wide font-bold bg-purple-400 hover:bg-purple-500 py-2 px-6 text-white rounded-lg">
                Login
              </a>
            </Link>
          </li>
        </ul>
      </Container>
    </header>
  );
};
