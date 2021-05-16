import Link from 'next/link';

import { DashLayout } from '@layouts/DashLayout';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/dist/frontend';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { QueryManager } from '~types/query';
import { ProjectByIdProps } from '~types/projects';
import { ProjectHeader } from '@components/dashboard/project-header';
import { joinString } from '@lib/utils';

const ProjectPage = withPageAuthRequired(() => {
  const router = useRouter();
  const { projectid } = router.query;

  // fetch
  const { data: project } = useSWR<QueryManager<ProjectByIdProps>>(
    projectid && `/api/user/projects/fetch/${projectid}`
  );

  return (
    <DashLayout pageTitle={project ? project.data.name : 'Loading project...'}>
      <div>
        {project && (
          <>
            <ProjectHeader
              name={project.data.name}
              refid={project.data.ref['@ref'].id}
              id={joinString(projectid)}
            />

            <div className="mt-8 w-11/12 mx-auto">
              <ul className="flex flex-col">
                {project.data.forms.map((form) => (
                  <Link
                    key={form.data.id}
                    href={`/dashboard/projects/${projectid}/${form.data.id}`}
                  >
                    <a className="p-6 bg-gray-100 hover:bg-purple-100 rounded-lg my-2">
                      <li>
                        <strong className="text-lg text-gray-600">{form.data.name}</strong>
                        <p className="text-gray-500">{form.data.description}</p>
                      </li>
                    </a>
                  </Link>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </DashLayout>
  );
});

export default ProjectPage;
