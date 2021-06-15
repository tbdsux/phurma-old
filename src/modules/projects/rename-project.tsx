import { apiPostFetch } from '@lib/fetch';
import { useRef, useState } from 'react';
import { ProjectModal } from './project-modal';
import { mutate } from 'swr';

type RenameProjectProps = {
  refid: string;
  name: string;
  id: string;
};

export const RenameProjectModal = ({ name, refid, id }: RenameProjectProps) => {
  const [open, setOpen] = useState(false);

  const inputProjectNameRef = useRef<HTMLInputElement>();
  const createProjectBtn = useRef<HTMLButtonElement>();

  const closeModal = () => {
    setOpen(false);
  };

  const openModal = () => {
    setOpen(true);
  };

  const HandleRenameProject = () => {
    const newname = inputProjectNameRef.current.value;

    if (name === newname) {
      closeModal();
      return;
    }

    createProjectBtn.current.disabled = true;
    createProjectBtn.current.innerHTML = 'Renaming Project...';

    apiPostFetch('/api/user/projects/update', {
      name: newname,
      refid
    })
      .then((r) => r.json())
      .then(() => {
        /* is possible, pass the project and use the response data for mutating */
        mutate(`/api/user/projects/fetch/${id}`).then(() => {
          createProjectBtn.current.disabled = false;
          createProjectBtn.current.innerHTML = 'Rename Project';
          closeModal();
        });
      })
      .catch((e) => console.error(e));
  };

  return (
    <ProjectModal
      open={open}
      onClose={closeModal}
      fnHandler={HandleRenameProject}
      inputProjectNameRef={inputProjectNameRef}
      inputProjectNameDefaultValue={name}
      fnButtonRef={createProjectBtn}
      dialogTitle="Modify | Rename Project"
      fnButtonText="Rename Project"
      initialFocus={inputProjectNameRef}
    >
      <button
        onClick={openModal}
        className="bg-purple-400 hover:bg-purple-500 text-sm p-1 text-white rounded-md"
      >
        rename
      </button>
    </ProjectModal>
  );
};
