import { GetServerSideProps, NextPage } from 'next';
import { ListProjects } from '@modules/projects/list-projects';
import { DashLayout } from '@layouts/DashLayout';
import { ListProjectProps } from '~types/projects';
import { getUserProjects } from '@functions/getProject';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const AllProjectsPage: NextPage<ListProjectProps> = ({ projects }) => {
  return (
    <DashLayout pageTitle="Dashboard | phurma">
      <div className="">
        <p className="my-4 text-gray-500">
          <i>Note:</i> You can create as many <strong>API forms</strong> in a single project, try to
          group your forms together.
        </p>

        <h3 className="font-bold underline tracking-wide text-xl text-gray-600">Projects</h3>

        <div className="mt-4">
          <ListProjects projects={projects} />
        </div>
      </div>
    </DashLayout>
  );
};

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  getServerSideProps: async ({ req, res }) => {
    const q = await getUserProjects(req, res);

    return {
      props: {
        projects: JSON.parse(JSON.stringify(q))
      }
    };
  }
});

export default AllProjectsPage;
