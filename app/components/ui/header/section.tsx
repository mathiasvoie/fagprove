interface HeaderSectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function HeaderSection({
  children,
  className,
}: HeaderSectionProps) {
  return <section className={`flex ${className}`}>{children}</section>;
}
