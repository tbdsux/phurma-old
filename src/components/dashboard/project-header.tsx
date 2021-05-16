import { NewFormModal } from './modals/new-form';
import { RenameProjectModal } from './modals/rename-project';

type ProjectHeaderProps = {
  name: string;
  id: string;
  refid: string;
};

export const ProjectHeader = ({ name, refid, id }: ProjectHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="inline-flex items-center">
        <h3 className="text-xl font-bold text-gray-500 mr-2">{name}</h3>
        <RenameProjectModal name={name} refid={refid} id={id} />
      </div>
      <NewFormModal projectid={refid} projectKeyId={id} />
    </div>
  );
};
