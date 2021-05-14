import { FaunaResponseProps } from '@ootiq/just-faunautils';
import Link from 'next/link';

import useSWR from 'swr';

import { ProjectProps } from '~types/projects';
import { QueryManager } from '~types/query';

export const ListProjects = () => {
  const { data: projects } = useSWR<QueryManager<FaunaResponseProps<ProjectProps>[]>>(
    '/api/user/projects/fetch'
  );

  if (!projects) {
    return <p>Loading...</p>;
  }

  return (
    <ul className="w-11/12 mx-auto flex flex-col">
      {projects &&
        projects.data.map((project, index) => (
          <Link href={`/dashboard/projects/${project.data.id}`} key={index}>
            <a className="my-2 rounded-lg border border-purple-300 hover:bg-purple-500 hover:text-white text-lg tracking-wide px-6 py-4 font-bold text-gray-700">
              <li className="">{project.data.name}</li>
            </a>
          </Link>
        ))}
    </ul>
  );
};
