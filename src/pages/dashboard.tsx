import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { DashLayout } from '@layouts/DashLayout';

const Dashboard = withPageAuthRequired(() => {
  const { user } = useUser();

  return (
    <DashLayout pageTitle="Dashboard | phurma">
      <div>
        <p className="text-xl tracking-wide text-gray-600">
          Welcome back <strong className="text-purple-500">{user.name}</strong>!
        </p>
      </div>
    </DashLayout>
  );
});

export default Dashboard;
