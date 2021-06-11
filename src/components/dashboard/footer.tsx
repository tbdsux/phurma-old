import Link from 'next/link';

export const DashFooter = () => {
  return (
    <>
      <hr />
      <footer className="w-5/6 mx-auto py-10 flex flex-col sm:flex-row items-center justify-between">
        <Link href="/">
          <a>
            <h3 className="font-bold tracking-wide text-purple-500">phurma</h3>
          </a>
        </Link>

        <p className="text-sm text-gray-700 my-4 sm:my-0">&copy; 2021 | All Rights Reserved</p>

        <ul className="text-sm text-gray-500">
          <li>
            <a
              title="Goto Github"
              href="https://github.com/TheBoringDude/phurma"
              className="hover:text-gray-600"
            >
              Github
            </a>
          </li>
          <li>
            <a title="Goto Quaker" href="https://quaker.vercel.app" className="hover:text-gray-600">
              Quaker
            </a>
          </li>
          <li>
            <a
              title="Goto LCL Paste"
              href="https://lcl-paste.vercel.app"
              className="hover:text-gray-600"
            >
              LCL Paste
            </a>
          </li>
        </ul>
      </footer>
    </>
  );
};
