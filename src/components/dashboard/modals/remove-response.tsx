import { useState } from 'react';
import { RemoveModal } from './remove-modal';

type RemoveResponseProps = {
  projectid: string;
  formid: string;
  resId: string;
};

export const RemoveResponse = ({ projectid, formid, resId }: RemoveResponseProps) => {
  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
  };

  const openModal = () => {
    setOpen(true);
  };

  const handler = () => {
    fetch(`/api/user/projects/forms/${projectid}/${formid}/${resId}`, {
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
        title="Remove Current Response"
        info="Are you sure you want to remove this response? This action is not irreverssible."
        fnHandler={handler}
      />

      <button
        onClick={openModal}
        className="absolute top-2 right-2 text-xs bg-red-400 hover:bg-red-500 text-white p-1 rounded-lg"
        type="button"
      >
        remove
      </button>
    </>
  );
};
