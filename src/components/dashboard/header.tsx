import React from 'react';
import { NewProjectModal } from './modals/new-project';
import { AnchorTextLink, TextLink } from './textlink';

export const DashHeader = () => {
  return (
    <>
      <header className="w-5/6 mx-auto py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-purple-500">phurma</h1>{' '}
          <span className="text-gray-500 text-sm ml-8">dashboard</span>
        </div>
        <ul className="flex items-center justify-between">
          <li>
            <NewProjectModal />
          </li>
          <li className="ml-14">
            <TextLink href="/dashboard/projects">Projects</TextLink>
          </li>
          <li className="ml-14">
            <AnchorTextLink href="/api/auth/logout?returnTo=/">Log Out</AnchorTextLink>
          </li>
        </ul>
      </header>
      <hr />
    </>
  );
};
