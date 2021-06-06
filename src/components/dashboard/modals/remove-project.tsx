import { useState } from 'react';
import { RemoveModal } from './remove-modal';

type RemoveProjectProps = {
  projectid: string;
};

export const RemoveProject = ({ projectid }: RemoveProjectProps) => {
  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
  };

  const openModal = () => {
    setOpen(true);
  };

  const handler = () => {
    fetch(`/api/user/projects/${projectid}`, {
      method: 'DELETE'
    })
      .then((r) => r.json())
      .then((data) => console.log(data))
      .catch((e) => console.error(e));
  };

  return (
    <>
      <RemoveModal
        open={open}
        onClose={closeModal}
        title="Remove Project"
        info="Are you sure you want to remove this response? This will remove the project, all it's sub-forms and their responses. This action is not irreverssible."
        fnHandler={handler}
      />

      <button
        onClick={openModal}
        type="button"
        className="ml-1 text-sm bg-red-400 hover:bg-red-500  text-white p-1 rounded-lg"
      >
        remove
      </button>
    </>
  );
};
