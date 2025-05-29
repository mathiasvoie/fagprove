interface ModalLayoutProps {
  create: React.ReactNode;
  edit: React.ReactNode;
  remove: React.ReactNode;
}

export default function ModalLayout({
  create,
  edit,
  remove,
}: ModalLayoutProps) {
  return (
    <>
      {create}

      {edit}

      {remove}
    </>
  );
}
