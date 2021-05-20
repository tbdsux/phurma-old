import { apiPostFetch } from '@lib/fetch';
import Router from 'next/router';
import React, { useRef, useState } from 'react';
import { mutate } from 'swr';
import { FormProps } from '~types/forms';
import { FormsModal } from './forms-modal';

type RenameFormModalProps = {
  form: FormProps;
  projectid: string;
  formRefId: string;
};

type BodyBaseFormProps = {
  name?: string;
  description?: string;
};

export const RenameFormModal = ({ projectid, form, formRefId }: RenameFormModalProps) => {
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

  const handleUpdateForm = () => {
    const body: BodyBaseFormProps = {};
    const name = inputFormNameRef.current.value;
    const description = inputFormDescriptionRef.current.value;

    if (!(name === form.name)) {
      body.name = name;
    }
    if (!(description == form.description)) {
      body.description = description;
    }

    btnCreateForm.current.innerHTML = 'Creating Form...';
    btnCreateForm.current.disabled = true;

    apiPostFetch('/api/user/projects/forms/update', {
      ...body,
      projectid,
      formid: formRefId
    })
      .then((r) => r.json())
      .then(() => {
        mutate(`/api/user/projects/fetch/${projectid}`)
          .then(() => {
            Router.push(`/dashboard/projects/${projectid}`);
            closeModal();
          })
          .catch(() => closeModal());
      })
      .catch((e) => console.error(e));
  };

  return (
    <FormsModal
      open={open}
      onClose={closeModal}
      inputFormNameRef={inputFormNameRef}
      inputFormDescriptionRef={inputFormDescriptionRef}
      inputFormNameValue={form.name}
      inputFormDescriptionValue={form.description}
      dialogTitle={`Update Current Form`}
      fnHandler={handleUpdateForm}
      fnButtonRef={btnCreateForm}
      fnButtonText="Update Form"
      initialFocus={inputFormNameRef}
    >
      <button onClick={openModal} className="mx-1 p-1 rounded-lg bg-purple-400 hover:bg-purple-500">
        update
      </button>
    </FormsModal>
  );
};
