interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <main className="flex w-full h-full justify-center p-12">
      <>
        <article className="flex max-w-[450px] w-full items-center h-auto flex-col gap-4">
          <h1 className="text-xl font-medium">Logg inn</h1>

          {children}
        </article>
      </>
    </main>
  );
}
