interface ModalLayoutProps {
  create: React.ReactNode;
  remove: React.ReactNode;
}

export default function ModalLayout({ create, remove }: ModalLayoutProps) {
  return (
    <>
      {create}

      {remove}
    </>
  );
}
