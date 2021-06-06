import { FaunaResponseProps } from '@ootiq/just-faunautils';
import { Dispatch, SetStateAction } from 'react';
import { ResponseProps } from '~types/response';

import { RemoveResponse } from '../modals/remove-response';

type SelectedResponseProps = {
  projectId: string;
  projectRefId: string;
  selected: ResponseProps; // this is not related to setSelected
  setSelected: Dispatch<SetStateAction<FaunaResponseProps<ResponseProps>>>;
};

export const SelectedResponse = ({
  projectId,
  projectRefId,
  selected,
  setSelected
}: SelectedResponseProps) => {
  return (
    <div className="col-span-3 p-6 overflow-y-auto relative">
      {selected && (
        <>
          <RemoveResponse
            resId={selected?.id}
            project={{ id: projectId, refid: projectRefId }}
            formid={selected?.formid}
            setSelected={setSelected}
          />

          {Object.entries(selected?.data).map(([key, value], index) => (
            <div key={index} className="my-4">
              <span className="text-sm tracking-wide bg-gray-200 p-1 rounded-md text-gray-800">
                {key}
              </span>
              <p className="mt-1 text-gray-600 tracking-wide">{JSON.stringify(value)}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
