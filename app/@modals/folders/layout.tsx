interface ModalLayoutProps {
  create: React.ReactNode;
}

export default function ModalLayout({ create }: ModalLayoutProps) {
  return <>{create}</>;
}
