import Link from 'next/link';
import React from 'react';
import { NewProjectModal } from './modals/new-project';
import { AnchorTextLink, TextLink } from './textlink';

export const DashHeader = () => {
  return (
    <>
      <header className="w-11/12 lg:w-5/6 mx-auto py-4 flex flex-col sm:flex-row items-center justify-between">
        <Link href="/dashboard">
          <a>
            <h1 className="text-2xl font-black text-purple-500">phurma</h1>{' '}
            <span className="text-gray-500 text-sm ml-8">dashboard</span>
          </a>
        </Link>
        <ul className="flex items-center justify-between mt-4 sm:mt-0 text-sm md:text-base">
          <li>
            <NewProjectModal />
          </li>
          <li className="ml-8 xs:ml-10 xl:ml-14">
            <TextLink href="/dashboard/projects">Projects</TextLink>
          </li>
          <li className="ml-8 xs:ml-10 xl:ml-14">
            <AnchorTextLink href="/api/auth/logout?returnTo=/">Log Out</AnchorTextLink>
          </li>
        </ul>
      </header>
      <hr />
    </>
  );
};
