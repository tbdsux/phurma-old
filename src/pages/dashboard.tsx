import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/dist/frontend';
import { ListProjects } from '@components/dashboard/list-projects';
import { DashLayout } from '@layouts/DashLayout';
import Link from 'next/link';

const SampleProjects = [
  {
    name: 'Helo'
  },
  {
    name: 'World'
  },
  {
    name: 'Sample'
  }
];

const Dashboard = withPageAuthRequired(() => {
  const { user } = useUser();

  return (
    <DashLayout pageTitle="Dashboard | phurma">
      <div className="">
        <p className="my-4 text-gray-500">
          <i>Note:</i> You can create as many <strong>API forms</strong> in a single project, try to
          group your projects together.
        </p>

        <h3 className="font-bold underline tracking-wide text-xl text-gray-600">Projects</h3>

        <div className="mt-4">
          <ListProjects />
        </div>
      </div>
    </DashLayout>
  );
});

export default Dashboard;
