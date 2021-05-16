import { Fragment, MutableRefObject, ReactNode } from 'react';
import { Transition, Dialog } from '@headlessui/react';

type ProjectModalProps = {
  open: boolean;
  fnHandler: () => void;
  inputProjectNameRef: MutableRefObject<HTMLInputElement>;
  inputProjectNameDefaultValue: string;
  fnButtonRef: MutableRefObject<HTMLButtonElement>;
  fnButtonText: string;
  dialogTitle: string;
  initialFocus?: MutableRefObject<HTMLElement>;
  onClose?: () => void;
  children?: ReactNode;
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
  return (
    <div>
      <Transition show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto bg-bland"
          static
          open={open}
          initialFocus={initialFocus || inputProjectNameRef}
          onClose={onClose}
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
                  {dialogTitle}
                </Dialog.Title>
                <div className="mt-4">
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

                <div className="mt-4">
                  <button
                    ref={fnButtonRef}
                    type="button"
                    className="focus:outline-none border-2 focus:border-purple-600 border-purple-200 py-2 px-6 bg-purple-400 hover:bg-purple-500 text-white rounded-lg disabled:hover:bg-purple-400"
                    onClick={fnHandler}
                  >
                    {fnButtonText}
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      {children}
    </div>
  );
};
