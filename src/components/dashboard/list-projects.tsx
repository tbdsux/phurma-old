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
            <a className="my-2 rounded-lg border border-purple-300 hover:bg-purple-200 px-6 py-4 flex items-center justify-between">
              <strong className="text-lg tracking-wide font-bold text-gray-700">
                {project.data.name}
              </strong>
              <p className="text-gray-400 tracking-wide font-medium">
                ({project.data.formRefs.length}{' '}
                {`form${project.data.formRefs.length !== 1 ? 's' : ''}`})
              </p>
            </a>
          </Link>
        ))}
    </ul>
  );
};
