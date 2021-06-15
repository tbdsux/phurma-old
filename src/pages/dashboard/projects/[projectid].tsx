import { DashLayout } from '@layouts/DashLayout';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/dist/frontend';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { QueryManager } from '~types/query';
import { ProjectByIdProps } from '~types/projects';
import { ProjectHeader } from '@modules/projects/project-header';
import { joinString } from '@lib/utils';
import { PageCrumbs } from '@components/dashboard/page-crumbs';
import { ListForms } from '@modules/forms/list-forms';
import { ErrorPageComponent } from '@components/error-page';

const ProjectPage = withPageAuthRequired(() => {
  const router = useRouter();
  const { projectid } = router.query;

  // fetch
  const { data: project } = useSWR<QueryManager<ProjectByIdProps>>(
    projectid && `/api/user/projects/fetch/${projectid}`
  );

  if (project?.error) {
    return <ErrorPageComponent code={project.code} title={project.description} />;
  }

  return (
    <DashLayout pageTitle={project?.data ? project.data.name : 'Loading project...'}>
      <div>
        {project && (
          <>
            <PageCrumbs
              links={[
                { text: 'projects', href: '/dashboard/projects' },
                { text: project.data?.name, href: `/dashboard/projects/${projectid}` }
              ]}
            />

            <ProjectHeader
              name={project.data?.name}
              refid={project.data?.ref['@ref'].id}
              id={joinString(projectid)}
            />

            <div className="mt-8 w-11/12 mx-auto">
              <ListForms projectid={joinString(projectid)} forms={project.data?.forms} />
            </div>
          </>
        )}
      </div>
    </DashLayout>
  );
});

export default ProjectPage;
