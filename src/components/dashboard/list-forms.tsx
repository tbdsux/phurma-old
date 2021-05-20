import Link from 'next/link';

import { FaunaResponseProps } from '@ootiq/just-faunautils';
import { FormProps } from '~types/forms';
import { RenameFormModal } from './modals/rename-form';

type ListFormsProps = {
  projectid: string;
  forms: FaunaResponseProps<FormProps>[];
};

export const ListForms = ({ projectid, forms }: ListFormsProps) => {
  return (
    <ul className="">
      {forms.map((form) => (
        <li key={form.data.id} className="relative w-full flex group">
          <div className="hidden focus:inline-flex group-hover:inline-flex absolute text-xs top-4 right-1 text-white">
            <RenameFormModal
              projectid={projectid}
              form={form.data}
              formRefId={form.ref['@ref'].id}
            />
            <button className="mx-1 p-1 rounded-lg bg-red-400 hover:bg-red-500">remove</button>
          </div>
          <Link href={`/dashboard/projects/${projectid}/${form.data.id}`}>
            <a className="p-6 bg-gray-100 hover:bg-purple-100 rounded-lg my-2 w-full">
              <strong className="text-lg text-gray-600">{form.data.name}</strong>
              <p className="text-gray-500">{form.data.description}</p>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};
