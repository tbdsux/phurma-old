/*
    Just a Link wrapper button.
*/

import { HTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';

type LinkButtonProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

export const LinkButton = ({ href, className, children }: LinkButtonProps) => {
  return (
    <Link href={href}>
      <a className={className}>{children}</a>
    </Link>
  );
};
