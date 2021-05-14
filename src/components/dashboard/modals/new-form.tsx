import { Transition, Dialog } from '@headlessui/react';
import { apiPostFetch } from '@lib/fetch';
import Router from 'next/router';
import React, { Fragment, useRef, useState } from 'react';
import { FormProps } from '~types/forms';
import { QueryManager } from '~types/query';

type NewFormModalProps = {
  projectid: string;
  projectKeyId: string;
};

export const NewFormModal = ({ projectid, projectKeyId }: NewFormModalProps) => {
  const [newFormModal, setNewFormModal] = useState(false);

  const formNameInput = useRef<HTMLInputElement>();
  const formDescriptionInput = useRef<HTMLInputElement>();

  const createFormBtn = useRef<HTMLButtonElement>();

  const openNewFormModal = () => {
    setNewFormModal(true);
  };
  const closeNewFormModal = () => {
    setNewFormModal(false);
  };

  const handleCreateForm = () => {
    const name = formNameInput.current.value;
    const description = formDescriptionInput.current.value;

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
    <>
      <Transition show={newFormModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto bg-bland"
          static
          open={newFormModal}
          onClose={closeNewFormModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-black tracking-wide leading-6 text-gray-700"
                >
                  Create New Form
                </Dialog.Title>
                <div className="mt-4 mx-4">
                  <div>
                    <div className="flex flex-col">
                      <label htmlFor="project-name" className="mb-1 text-gray-600">
                        Enter your form&apos;s name
                      </label>
                      <input
                        ref={formNameInput}
                        type="text"
                        name="project-name"
                        id="input-project-name"
                        className="border-2 border-purple-200 py-2 px-4 text-purple-500 tracking-wide focus:outline-none focus:border-purple-500 rounded-lg"
                        placeholder="What is your project's name?"
                      />
                    </div>
                    <div className="flex flex-col mt-3">
                      <label htmlFor="project-description" className="mb-1 text-gray-600 text-sm">
                        Description for your form
                      </label>
                      <input
                        ref={formDescriptionInput}
                        type="text"
                        name="project-description"
                        id="input-project-description"
                        className="border-2 border-purple-200 py-2 px-4 text-purple-500 tracking-wide focus:outline-none focus:border-purple-500 rounded-lg text-sm"
                        placeholder="Enter a description about the form..."
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      ref={createFormBtn}
                      type="button"
                      className="focus:outline-none border-2 focus:border-purple-600 border-purple-200 py-2 px-6 bg-purple-400 hover:bg-purple-500 text-white rounded-lg disabled:hover:bg-purple-400"
                      onClick={handleCreateForm}
                    >
                      Create Form
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      <button
        onClick={openNewFormModal}
        className="py-1 px-4 rounded-md border border-purple-300 bg-purple-100 hover:bg-purple-300 text-purple-800 opacity-90 hover:opacity-100"
      >
        Create New Form
      </button>
    </>
  );
};
