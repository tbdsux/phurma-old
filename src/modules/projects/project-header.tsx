import { NewFormModal } from '@modules/forms/new-form';
import { RemoveProject } from '@modules/projects/remove-project';
import { RenameProjectModal } from './rename-project';

type ProjectHeaderProps = {
  name: string;
  id: string;
  refid: string;
};

export const ProjectHeader = ({ name, refid, id }: ProjectHeaderProps) => {
  return (
    <div className="flex flex-col xs:flex-row items-stretch xs:items-center justify-between">
      <div className="inline-flex items-center">
        <h3 className="text-xl font-bold text-gray-500 mr-2 truncate">{name}</h3>
        <RenameProjectModal name={name} refid={refid} id={id} />
        <RemoveProject projectRefId={refid} />
      </div>
      <NewFormModal projectid={refid} projectKeyId={id} />
    </div>
  );
};
