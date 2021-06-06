import { ResponseProps } from '~types/response';

import { RemoveResponse } from '../modals/remove-response';

type SelectedResponseProps = {
  projectid: string;
  selected: ResponseProps;
};

export const SelectedResponse = ({ projectid, selected }: SelectedResponseProps) => {
  return (
    <div className="col-span-3 p-6 overflow-y-auto relative">
      {selected && (
        <>
          <RemoveResponse
            resId={selected?.data.id}
            projectid={projectid}
            formid={selected?.data.formid}
          />

          {Object.entries(selected?.data.data).map(([key, value], index) => (
            <div key={index} className="my-4">
              <span className="text-sm tracking-wide bg-gray-200 p-1 rounded-md text-gray-800">
                {key}
              </span>
              <p className="mt-1 text-gray-600 tracking-wide">{value}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
