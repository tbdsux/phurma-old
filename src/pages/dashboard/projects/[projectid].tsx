import Link from 'next/link';

import { DashLayout } from '@layouts/DashLayout';

const forms = [
  {
    name: 'form1',
    description: 'This is just an amazing description for a form.'
  },
  {
    name: 'form2',
    description: 'This is just an amazing description for a form.'
  },
  {
    name: 'formasdasd',
    description: 'This is just an amazing description for a form.'
  }
];

const ProjectPage = () => {
  return (
    <DashLayout pageTitle="Project Page">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-500">Project Name</h3>
          <button className="py-1 px-4 rounded-md border border-purple-300 bg-purple-100 hover:bg-purple-300 text-purple-800 opacity-90 hover:opacity-100">
            Create New Form
          </button>
        </div>

        <div className="mt-8 w-11/12 mx-auto">
          <ul className="flex flex-col">
            {forms.map((form, index) => (
              <>
                <Link key={index} href="/">
                  <a className="p-6 bg-gray-100 hover:bg-purple-100 rounded-lg">
                    <li>
                      <strong className="text-lg text-gray-600">{form.name}</strong>
                      <p className="text-gray-500">{form.description}</p>
                    </li>
                  </a>
                </Link>
                <hr className="my-2" />
              </>
            ))}
          </ul>
        </div>
      </div>
    </DashLayout>
  );
};

export default ProjectPage;
