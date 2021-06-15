import useSWR from 'swr';
import { QueryManager } from '~types/query';
import { UserStatsProps } from '~types/stats';

export const UserStats = () => {
  const { data: stats } = useSWR<QueryManager<UserStatsProps>>('/api/user/stats');

  if (!stats) return <p className="mt-8">Loading...</p>;

  return (
    <div className="my-12">
      <p className="text-gray-500 tracking-wider">My Statistics: </p>
      <section className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="rounded-lg p-6 border border-purple-300">
          <h3 className="font-black text-5xl text-purple-500">{stats.data.total.projects}</h3>
          <h4 className="text-lg mt-2 text-gray-600">Total Projects</h4>
        </div>

        <div className="rounded-lg p-6 border border-purple-300">
          <h3 className="font-black text-5xl text-purple-500">{stats.data.total.forms}</h3>
          <h4 className="text-lg mt-2 text-gray-600">Total Forms</h4>
        </div>
      </section>
    </div>
  );
};
