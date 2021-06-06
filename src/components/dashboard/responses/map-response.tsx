import { Dispatch, SetStateAction } from 'react';
import { FaunaResponseProps } from '@ootiq/just-faunautils';
import { DataProps } from '@ootiq/just-faunautils/lib/utils';

import { ResponseProps } from '~types/response';

type MapResponseProps = {
  responses: FaunaResponseProps<ResponseProps>[];
  setSelected: Dispatch<SetStateAction<FaunaResponseProps<ResponseProps>>>;
  selected: FaunaResponseProps<ResponseProps>;
};

const MapResponse = ({ responses, selected, setSelected }: MapResponseProps) => {
  // generates a preview-like string
  const stringJson = (d: DataProps) => {
    const f = Object.keys(d)[0];
    return [f, d[f]].join(' ');
  };

  const isNew = (d: string): boolean => {
    const today = new Date().getTime();
    const date = new Date(d).getTime();

    if (today - date < 86400000) {
      return true;
    }

    return false;
  };

  return (
    <ul>
      {responses.map((submission, index) => (
        <li key={index}>
          <div
            onClick={() => {
              setSelected(submission);
            }}
            className={`relative py-8 px-3 cursor-pointer ${
              index !== responses.indexOf(selected) ? 'hover:bg-purple-200' : 'bg-purple-200'
            }`}
          >
            {isNew(submission.data.createdDate) && (
              <span className="bg-purple-300 p-1 absolute top-1 right-1 text-xs text-white rounded-md">
                new
              </span>
            )}
            <p className="line-clamp-2 tracking-wide text-gray-700">
              {stringJson(submission.data.data)}
            </p>
          </div>
          <hr />
        </li>
      ))}
    </ul>
  );
};

export { MapResponse };
