import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import { User } from '@/app/services/user';
import { getServerSession } from 'next-auth';

interface LayoutProps {
  actions: React.ReactNode;
  children: React.ReactNode;
}

export default async function Layout({ actions, children }: LayoutProps) {
  const session = await getServerSession(authOptions);

  const isAdministrator =
    session?.user?.id && (await User.isAdministrator(session?.user?.id));

  return (
    <main className="flex items-start h-full justify-center w-full overflow-y-auto">
      <>
        <div className="flex flex-col h-auto max-w-[1500px] py-5 w-full">
          <>
            <nav className="flex items-center p-4 justify-between">
              <>
                <span className="flex flex-col gap-1">
                  <h1 className="text-xl font-medium">Mapper</h1>
                  <p className="text-sm text-gray-500">
                    Oversikt over alle mapper som er lagt inn i prosjektet.
                  </p>
                </span>
              </>
              {isAdministrator && actions}
            </nav>
          </>

          {children}
        </div>
      </>
    </main>
  );
}
