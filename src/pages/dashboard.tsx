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

const Dashboard = () => {
  return (
    <DashLayout pageTitle="Dashboard | phurma">
      <div className="">
        <p className="my-4 text-gray-500">
          <i>Note:</i> You can create as many <strong>API forms</strong> in a single project, try to
          group your projects together.
        </p>

        <h3 className="font-bold underline tracking-wide text-xl text-gray-600">Projects</h3>

        <div className="mt-4">
          <ul className="w-11/12 mx-auto flex flex-col">
            {SampleProjects.map((project, index) => (
              <Link href="/" key={index}>
                <a className="my-2 rounded-lg border border-purple-300 hover:bg-purple-500 hover:text-white text-lg tracking-wide px-6 py-4 font-bold text-gray-700">
                  <li className="">{project.name}</li>
                </a>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </DashLayout>
  );
};

export default Dashboard;
