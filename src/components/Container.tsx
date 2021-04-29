import { ReactNode } from 'react';

interface ContainerProps {
  size: 'w-5/6' | 'w-4/5' | 'w-2/3' | 'w-11/12';
  className?: string;
  children?: ReactNode;
}

export const Container = (props: ContainerProps) => {
  return <div className={`${props.size} mx-auto ${props.className}`}>{props.children}</div>;
};
