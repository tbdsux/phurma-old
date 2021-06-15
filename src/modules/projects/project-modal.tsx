import { MutableRefObject, ReactNode, useState } from 'react';

import { Dialog } from '@headlessui/react';

import { BaseModal } from '@components/modals/base';

type ProjectModalProps = {
  open: boolean;
  fnHandler: () => void;
  inputProjectNameRef: MutableRefObject<HTMLInputElement>;
  inputProjectNameDefaultValue: string;
  fnButtonRef: MutableRefObject<HTMLButtonElement>;
  fnButtonText: string;
  dialogTitle: string;
  initialFocus: MutableRefObject<HTMLElement>;
  onClose: () => void;
  children: ReactNode;
};

export const ProjectModal = ({
  open,
  fnHandler,
  inputProjectNameRef,
  inputProjectNameDefaultValue,
  fnButtonRef,
  fnButtonText,
  dialogTitle,
  initialFocus,
  onClose,
  children
}: ProjectModalProps) => {
  const [ongoing, setOngoing] = useState(false);

  const handlerWrapper = () => {
    setOngoing(true);

    fnHandler();
  };

  /* a wrapper to the close function (prevents unnecessary modal close in on-going operations) */
  const closeWrapper = () => {
    if (!ongoing) {
      onClose();
    }
  };

  return (
    <div>
      <BaseModal onClose={closeWrapper} open={open} focusRef={initialFocus} width="max-w-2xl">
        <Dialog.Title
          as="h3"
          className="underline text-lg font-black tracking-wide leading-6 text-gray-700"
        >
          {dialogTitle}
        </Dialog.Title>
        <div className="mt-2">
          <div className="flex flex-col">
            <label htmlFor="project-name" className="mb-1 text-gray-600">
              Enter your project&apos;s name
            </label>
            <input
              ref={inputProjectNameRef}
              type="text"
              name="project-name"
              id="input-project-name"
              defaultValue={inputProjectNameDefaultValue}
              className="border-2 border-purple-200 py-2 px-4 text-purple-500 tracking-wide focus:outline-none focus:border-purple-500 rounded-lg"
              placeholder="What is your project's name?"
            />
          </div>
        </div>

        <div className="mt-4 text-sm">
          <button
            ref={fnButtonRef}
            type="button"
            className="focus:outline-none border-2 focus:border-purple-600 border-purple-200 py-2 px-6 bg-purple-400 hover:bg-purple-500 text-white rounded-lg disabled:hover:bg-purple-400"
            onClick={handlerWrapper}
          >
            {fnButtonText}
          </button>
        </div>
      </BaseModal>
      {children}
    </div>
  );
};
