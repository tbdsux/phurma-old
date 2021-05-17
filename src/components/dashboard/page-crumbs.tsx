import Link from 'next/link';

type PageCrumbsLinkProps = {
  text: string;
  href: string;
};
type PageCrumbsProps = {
  links: PageCrumbsLinkProps[];
};

export const PageCrumbs = ({ links }: PageCrumbsProps) => {
  return (
    <p className="text-sm text-gray-400 tracking-wide mb-8">
      {links.map((link, index) => (
        <span key={index}>
          <Link href={link.href}>
            <a className="hover:underline">{link.text}</a>
          </Link>
          {index < links.length - 1 ? ' > ' : ''}
        </span>
      ))}
    </p>
  );
};
