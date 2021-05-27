import Link from 'next/link';

export const DashFooter = () => {
  return (
    <>
      <hr />
      <footer className="w-5/6 mx-auto py-10 flex items-center justify-between">
        <Link href="/">
          <a>
            <h3 className="font-bold tracking-wide text-purple-500">phurma</h3>
          </a>
        </Link>

        <p className="text-sm text-gray-700">&copy; 2021 | All Rights Reserved</p>

        <ul className="text-sm text-gray-500">
          <li>
            <a href="https://github.com/TheBoringDude/phurma">Github</a>
          </li>
          <li>
            <a href="https://quaker.vercel.app">Quaker</a>
          </li>
          <li>
            <a href="https://lcl-paste.vercel.app">LCL Paste</a>
          </li>
        </ul>
      </footer>
    </>
  );
};
