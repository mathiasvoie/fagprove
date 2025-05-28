interface HeaderContainerProps {
  children: React.ReactNode;
}

export default function HeaderContainer({ children }: HeaderContainerProps) {
  return (
    <header className="flex w-full border-b-[1px] border-gray-200 bg-header px-4 py-2 justify-center items-center">
      <article className="flex max-w-[1500px] w-full p-2 justify-between items-center">
        {children}
      </article>
    </header>
  );
}
