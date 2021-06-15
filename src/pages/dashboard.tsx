import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { UserStats } from '@modules/user/user-stats';
import { DashLayout } from '@layouts/DashLayout';

const Dashboard = withPageAuthRequired(() => {
  const { user } = useUser();

  return (
    <DashLayout pageTitle="Dashboard | phurma">
      <div>
        <p className="text-xl tracking-wide text-gray-600">
          Welcome back <strong className="text-purple-500">{user.name}</strong>!
        </p>

        <div className="my-8 text-right">
          <p className="text-gray-400">{new Date().toString()}</p>
        </div>

        <UserStats />
      </div>
    </DashLayout>
  );
});

export default Dashboard;
