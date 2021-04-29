import { ReactNode } from 'react';

type ColorProps = {
  children: ReactNode;
};

export const Color = ({ children }: ColorProps) => {
  return <span className="text-purple-500">{children}</span>;
};
