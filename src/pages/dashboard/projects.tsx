import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { ListProjects } from '@components/dashboard/list-projects';
import { DashLayout } from '@layouts/DashLayout';

const AllProjectsPage = withPageAuthRequired(() => {
  return (
    <DashLayout pageTitle="Dashboard | phurma">
      <div className="">
        <p className="my-4 text-gray-500">
          <i>Note:</i> You can create as many <strong>API forms</strong> in a single project, try to
          group your forms together.
        </p>

        <h3 className="font-bold underline tracking-wide text-xl text-gray-600">Projects</h3>

        <div className="mt-4">
          <ListProjects />
        </div>
      </div>
    </DashLayout>
  );
});

export default AllProjectsPage;
