import { Dialog } from '@headlessui/react';
import { MutableRefObject, ReactNode, useState } from 'react';
import { BaseModal } from './base';

type FormsModalProps = {
  onClose: () => void;
  open: boolean;
  initialFocus: MutableRefObject<HTMLElement>;
  inputFormNameRef: MutableRefObject<HTMLInputElement>;
  inputFormNameValue: string;
  inputFormDescriptionRef: MutableRefObject<HTMLInputElement>;
  inputFormDescriptionValue: string;
  fnButtonRef: MutableRefObject<HTMLButtonElement>;
  fnButtonText: string;
  fnHandler: () => void;
  dialogTitle: string;
  children: ReactNode;
};

export const FormsModal = ({
  onClose,
  open,
  initialFocus,
  inputFormDescriptionRef,
  inputFormDescriptionValue,
  inputFormNameRef,
  inputFormNameValue,
  fnButtonRef,
  fnButtonText,
  fnHandler,
  dialogTitle,
  children
}: FormsModalProps) => {
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
      <BaseModal open={open} onClose={closeWrapper} focusRef={initialFocus} width="max-w-xl">
        <Dialog.Title
          as="h3"
          className="underline text-lg font-black tracking-wide leading-6 text-gray-700"
        >
          {dialogTitle}
        </Dialog.Title>
        <div className="mt-2 mx-4">
          <div>
            <div className="flex flex-col">
              <label htmlFor="project-name" className="mb-1 text-gray-600">
                Enter your form&apos;s name
              </label>
              <input
                ref={inputFormNameRef}
                type="text"
                name="project-name"
                id="input-project-name"
                defaultValue={inputFormNameValue}
                className="border-2 border-purple-200 py-2 px-4 text-purple-500 tracking-wide focus:outline-none focus:border-purple-500 rounded-lg"
                placeholder="What is your project's name?"
              />
            </div>
            <div className="flex flex-col mt-1">
              <label htmlFor="project-description" className="mb-1 text-gray-600 text-sm">
                Description for your form
              </label>
              <input
                ref={inputFormDescriptionRef}
                type="text"
                name="project-description"
                id="input-project-description"
                defaultValue={inputFormDescriptionValue}
                className="border-2 border-purple-200 py-2 px-4 text-purple-500 tracking-wide focus:outline-none focus:border-purple-500 rounded-lg text-sm"
                placeholder="Enter a description about the form..."
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
            <button
              type="button"
              className="ml-2 focus:outline-none border-2 focus:border-gray-600 border-gray-200 py-2 px-6 bg-gray-400 hover:bg-gray-500 text-white rounded-lg"
              onClick={closeWrapper}
            >
              Cancel
            </button>
          </div>
        </div>
      </BaseModal>
      {children}
    </div>
  );
};
