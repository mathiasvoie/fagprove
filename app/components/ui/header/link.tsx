import Link from 'next/link';

interface HeaderLinkProps {
  href: string;
  children?: React.ReactNode;
  className?: string;
}

export default function HeaderLink({
  href,
  children,
  className,
}: HeaderLinkProps) {
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
