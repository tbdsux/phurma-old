import { apiPostFetch } from '@lib/fetch';
import Router from 'next/router';
import React, { useRef, useState } from 'react';
import { FormProps } from '~types/forms';
import { QueryManager } from '~types/query';
import { FormsModal } from './forms-modal';

type NewFormModalProps = {
  projectid: string;
  projectKeyId: string;
};

export const NewFormModal = ({ projectid, projectKeyId }: NewFormModalProps) => {
  const [open, setOpen] = useState(false);

  const inputFormNameRef = useRef<HTMLInputElement>();
  const inputFormDescriptionRef = useRef<HTMLInputElement>();

  const btnCreateForm = useRef<HTMLButtonElement>();

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  const handleCreateForm = () => {
    const name = inputFormNameRef.current.value;
    const description = inputFormDescriptionRef.current.value;

    btnCreateForm.current.innerHTML = 'Creating Form...';
    btnCreateForm.current.disabled = true;

    apiPostFetch('/api/user/projects/forms/create', {
      name,
      description,
      projectid
    })
      .then((r) => r.json())
      .then((d: QueryManager<FormProps>) => {
        Router.push(`/dashboard/projects/${projectKeyId}/${d.data.id}`);
      })
      .catch((e) => console.error(e));
  };

  return (
    <FormsModal
      open={open}
      onClose={closeModal}
      inputFormNameRef={inputFormNameRef}
      inputFormDescriptionRef={inputFormDescriptionRef}
      inputFormNameValue={null}
      inputFormDescriptionValue={null}
      dialogTitle="Create New Form"
      fnHandler={handleCreateForm}
      fnButtonRef={btnCreateForm}
      fnButtonText="Create Form"
      initialFocus={inputFormNameRef}
    >
      <button
        onClick={openModal}
        className="mt-2 xs:mt-0 text-sm py-1 px-4 rounded-md border border-purple-300 bg-purple-100 hover:bg-purple-300 text-purple-800 opacity-90 hover:opacity-100"
      >
        Create New Form
      </button>
    </FormsModal>
  );
};
