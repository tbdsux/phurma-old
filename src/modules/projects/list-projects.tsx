import { FaunaResponseProps } from '@ootiq/just-faunautils';
import Link from 'next/link';

import useSWR from 'swr';

import { ListProjectProps, ProjectProps } from '~types/projects';
import { QueryManager } from '~types/query';

export const ListProjects = ({ projects: initialProjects }: ListProjectProps) => {
  const { data: projects } = useSWR<QueryManager<FaunaResponseProps<ProjectProps>[]>>(
    '/api/user/projects/fetch',
    { initialData: initialProjects }
  );

  if (!projects) {
    return <p>Loading...</p>;
  }

  // show error in text for if it is
  if (projects?.error) {
    return (
      <p className="text-red-500" id="error-message">
        {projects.description}
      </p>
    );
  }

  return (
    <ul className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
      {projects &&
        projects.data.map((project, index) => (
          <Link href={`/dashboard/projects/${project.data.id}`} key={index}>
            <a
              title={`Select project '${project.data.name}'`}
              className="my-2 rounded-lg border group border-purple-300 hover:bg-purple-400 px-6 py-4"
            >
              <strong className="text-xl tracking-wide font-extrabold text-gray-600 group-hover:text-white">
                {project.data.name}
              </strong>
              <p className="mt-2 text-right text-gray-400 tracking-wide font-medium group-hover:text-gray-100">
                ({project.data.formRefs.length}{' '}
                {`form${project.data.formRefs.length !== 1 ? 's' : ''}`})
              </p>
            </a>
          </Link>
        ))}
    </ul>
  );
};
