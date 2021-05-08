import { DashLayout } from '@layouts/DashLayout';

const forms = [
  {
    name: 'form1'
  },
  {
    name: 'form2'
  },
  {
    name: 'formasdasd'
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

        <div></div>
      </div>
    </DashLayout>
  );
};

export default ProjectPage;
