import { useState } from 'react';
import Router from 'next/router';

import { mutate } from 'swr';

import { RemoveModal } from '@components/modals/remove-modal';

type RemoveFormProps = {
  formname: string;
  projectRef: string;
  projectid: string;
  formId: string;
};

export const RemoveForm = ({ formname, projectRef, formId, projectid }: RemoveFormProps) => {
  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
  };

  const openModal = () => {
    setOpen(true);
  };

  /* function handler */
  const handler = () => {
    fetch(`/api/user/projects/forms/${projectRef}/${formId}`, {
      method: 'DELETE'
    })
      .then((r) => r.json())
      .then(() => {
        mutate(`/api/user/projects/fetch/${projectid}`).then(() => {
          Router.push(`/dashboard/projects/${projectid}`);
        });
      })
      .catch((e) => console.error(e));
  };

  return (
    <>
      <RemoveModal
        open={open}
        onClose={closeModal}
        title={`Remove Form (${formname})`}
        info="Are you sure you want to remove this form? This action is not irreverssible."
        fnHandler={handler}
      />

      <button onClick={openModal} className="mx-1 p-1 rounded-lg bg-red-400 hover:bg-red-500">
        remove
      </button>
    </>
  );
};
