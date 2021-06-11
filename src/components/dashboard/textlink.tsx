import { AnchorHTMLAttributes } from 'react';
import Link from 'next/link';

type TextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

const textClassName = (classname: string) =>
  ['text-gray-600 hover:text-purple-500 tracking-wide', classname].join(' ');

const TextLink = (props: TextLinkProps) => {
  const { className, href, children } = props;

  return (
    <Link href={href}>
      <a {...props} className={textClassName(className)}>
        {children}
      </a>
    </Link>
  );
};

const AnchorTextLink = (props: TextLinkProps) => {
  const { className, children } = props;

  return (
    <a {...props} className={textClassName(className)}>
      {children}
    </a>
  );
};

export { TextLink, AnchorTextLink };
