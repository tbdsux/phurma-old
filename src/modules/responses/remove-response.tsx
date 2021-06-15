import { Dispatch, SetStateAction, useState } from 'react';

import { mutate } from 'swr';
import { FaunaResponseProps } from '@ootiq/just-faunautils';

import { RemoveModal } from '@components/modals/remove-modal';
import { ResponseProps } from '~types/response';

type RemoveResponseProps = {
  project: {
    id: string;
    refid: string;
  };
  formid: string;
  resId: string;
  setSelected: Dispatch<SetStateAction<FaunaResponseProps<ResponseProps>>>;
};

export const RemoveResponse = ({ project, formid, resId, setSelected }: RemoveResponseProps) => {
  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
  };

  const openModal = () => {
    setOpen(true);
  };

  const handler = () => {
    fetch(`/api/user/projects/forms/${project.refid}/${formid}/${resId}`, {
      method: 'DELETE'
    })
      .then((r) => r.json())
      .then(() => {
        setSelected(null);
        mutate(`/api/user/projects/forms/${project.id}/${formid}`).then(() => {
          closeModal();
        });
      })
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
