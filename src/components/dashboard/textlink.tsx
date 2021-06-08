import Link from 'next/link';
import { ReactNode } from 'react';

type TextLinkProps = {
  href: string;
  className?: string;
  id?: string;
  children: ReactNode;
};

const textClassName = (classname: string) =>
  ['text-gray-600 hover:text-purple-500 tracking-wide', classname].join(' ');

const TextLink = ({ href, className, id, children }: TextLinkProps) => {
  return (
    <Link href={href}>
      <a id={id} className={textClassName(className)}>
        {children}
      </a>
    </Link>
  );
};

const AnchorTextLink = ({ href, className, id, children }: TextLinkProps) => {
  return (
    <a href={href} id={id} className={textClassName(className)}>
      {children}
    </a>
  );
};

export { TextLink, AnchorTextLink };
