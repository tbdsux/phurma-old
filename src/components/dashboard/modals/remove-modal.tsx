import { useRef, useState } from 'react';
import { Dialog } from '@headlessui/react';

import { BaseModal } from './base';

type RemoveModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  info: string;
  fnHandler: () => void;
};

export const RemoveModal = ({ open, onClose, title, info, fnHandler }: RemoveModalProps) => {
  const [ongoing, setOngoing] = useState(false);

  const btnCancelRef = useRef<HTMLButtonElement>(null);
  const btnRemoveRef = useRef<HTMLButtonElement>(null);

  const handlerWrapper = () => {
    setOngoing(true);
    btnRemoveRef.current.innerHTML = 'Removing...';
    btnRemoveRef.current.disabled = true;

    // disable cancel
    btnCancelRef.current.disabled = true;
    btnCancelRef.current.innerText = 'Cannot Cancel';

    fnHandler();
  };

  /* a wrapper to the close function (prevents unnecessary modal close in on-going operations) */
  const closeWrapper = () => {
    if (!ongoing) {
      onClose();
    }
  };

  return (
    <BaseModal open={open} onClose={closeWrapper} focusRef={btnCancelRef} width="max-w-xl">
      <Dialog.Title
        as="h3"
        className="underline text-lg font-black tracking-wide leading-6 text-gray-700"
      >
        {title}
      </Dialog.Title>

      <div className="my-2">
        <p className="py-4 text-gray-600">{info}</p>
      </div>

      <div className="mt-4 text-sm">
        <button
          ref={btnCancelRef}
          type="button"
          className="focus:outline-none border-2 focus:border-gray-600 border-gray-200 py-2 px-6 bg-gray-400 hover:bg-gray-500 text-white rounded-lg"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          ref={btnRemoveRef}
          type="button"
          className="ml-2 focus:outline-none border-2 focus:border-red-600 border-red-200 py-2 px-6 bg-red-400 hover:bg-red-500 text-white rounded-lg disabled:hover:bg-purple-400"
          onClick={handlerWrapper}
        >
          Remove
        </button>
      </div>
    </BaseModal>
  );
};
