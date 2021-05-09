import { ObjectProps } from './utils';

const usePostFetch = async (website: string, body: ObjectProps) => {
  return await fetch(website, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
};

export { usePostFetch };
