import React, { Fragment, useRef, useState } from 'react';
import { ColorButton } from '@components/shared/button';
import { Transition, Dialog } from '@headlessui/react';
import { DocumentAddIcon } from '@heroicons/react/outline';
import { usePostFetch } from '@lib/fetch';

export const NewProjectModal = () => {
  const [newProjectModal, setNewProjectModal] = useState(false);

  const inputProjectNameRef = useRef<HTMLInputElement>();
  const createProjectBtn = useRef<HTMLButtonElement>();

  const closeProjectModal = () => {
    setNewProjectModal(false);
  };

  const openProjectModal = () => {
    setNewProjectModal(true);
  };

  const HandleCreateProject = () => {
    createProjectBtn.current.disabled = true;
    createProjectBtn.current.innerHTML = 'Creating Project...';

    const projectname = inputProjectNameRef.current.value;

    usePostFetch('/api/user/projects/create', {
      name: projectname
    })
      .then((r) => r.json())
      .then((d) => {
        console.log(d);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <>
      <Transition show={newProjectModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto bg-bland"
          static
          open={newProjectModal}
          initialFocus={inputProjectNameRef}
          onClose={closeProjectModal}
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
                  Create New Project
                </Dialog.Title>
                <div className="mt-4">
                  <div className="flex flex-col">
                    <label htmlFor="project-name" className="mb-1 text-gray-600">
                      Enter your project's name
                    </label>
                    <input
                      ref={inputProjectNameRef}
                      type="text"
                      name="project-name"
                      id="input-project-name"
                      className="border-2 border-purple-200 py-2 px-4 text-purple-500 tracking-wide focus:outline-none focus:border-purple-500 rounded-lg"
                      placeholder="What is your project's name?"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    ref={createProjectBtn}
                    type="button"
                    className="focus:outline-none border-2 focus:border-purple-600 border-purple-200 py-2 px-6 bg-purple-400 hover:bg-purple-500 text-white rounded-lg disabled:hover:bg-purple-400"
                    onClick={HandleCreateProject}
                  >
                    Create Project
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      <ColorButton
        onClick={openProjectModal}
        className="py-2 px-4 rounded-lg tracking-wide text-sm inline-flex items-center"
      >
        <DocumentAddIcon className="h-5 w-5 mr-1" />
        New Project
      </ColorButton>
    </>
  );
};
