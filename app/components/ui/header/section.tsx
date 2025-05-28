interface HeaderSectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function HeaderSection({
  children,
  className,
}: HeaderSectionProps) {
  return <section className={`flex gap-1 ${className}`}>{children}</section>;
}
