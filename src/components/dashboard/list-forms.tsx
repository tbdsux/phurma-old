import Link from 'next/link';

import { FaunaResponseProps } from '@ootiq/just-faunautils';
import { FormProps } from '~types/forms';

type ListFormsProps = {
  projectid: string;
  forms: FaunaResponseProps<FormProps>[];
};

export const ListForms = ({ projectid, forms }: ListFormsProps) => {
  return (
    <ul className="">
      {forms.map((form) => (
        <li key={form.data.id} className="relative w-full flex group">
          <div className="hidden focus:block group-hover:block absolute text-xs top-4 right-1 text-white">
            <button className="mx-1 p-1 rounded-lg bg-purple-400 hover:bg-purple-500">
              update
            </button>
            <button className="mx-1 p-1 rounded-lg bg-red-400 hover:bg-red-500">remove</button>
          </div>
          <Link href={`/dashboard/projects/${projectid}/${form.data.id}`}>
            <a className="p-6 bg-gray-100 hover:bg-purple-100 rounded-lg my-2 w-full">
              <li>
                <strong className="text-lg text-gray-600">{form.data.name}</strong>
                <p className="text-gray-500">{form.data.description}</p>
              </li>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};
