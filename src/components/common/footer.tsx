import Link from 'next/link';

export const Footer = () => {
  return (
    <>
      <hr />
      <footer className="w-5/6 mx-auto py-10 flex flex-col sm:flex-row items-center justify-between">
        <Link href="/dashboard">
          <a>
            <h3 className="font-bold tracking-wide text-purple-500">phurma</h3>
            <p className="text-gray-500 ml-4 text-sm">dashboard</p>
          </a>
        </Link>

        <p className="text-sm text-gray-700 my-4 sm:my-0">&copy; 2021 | All Rights Reserved</p>

        <ul className="text-sm text-gray-500">
          <li>
            <a target="_blank" rel="noreferrer" href="https://github.com/TheBoringDude/phurma">
              Github
            </a>
          </li>
          <li>
            <a target="_blank" rel="noreferrer" href="https://quaker.vercel.app">
              Quaker
            </a>
          </li>
          <li>
            <a target="_blank" rel="noreferrer" href="https://lcl-paste.vercel.app">
              LCL Paste
            </a>
          </li>
        </ul>
      </footer>
    </>
  );
};
