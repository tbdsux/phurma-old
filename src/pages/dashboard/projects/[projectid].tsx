import Link from 'next/link';

import { DashLayout } from '@layouts/DashLayout';
import { NewFormModal } from '@components/dashboard/modals/new-form';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/dist/frontend';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { QueryManager } from '~types/query';
import { ProjectByIdProps } from '~types/projects';
import { joinString } from '@lib/utils';

const ProjectPage = withPageAuthRequired(() => {
  const router = useRouter();
  const { projectid } = router.query;

  // fetch
  const { data: project } = useSWR<QueryManager<ProjectByIdProps>>(
    projectid && `/api/user/projects/fetch/${projectid}`
  );

  return (
    <DashLayout pageTitle="Project Page">
      <div>
        {project && (
          <>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-500">{project.data.name}</h3>
              <NewFormModal
                projectid={project.data.ref['@ref'].id}
                projectKeyId={joinString(projectid)}
              />
            </div>

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
