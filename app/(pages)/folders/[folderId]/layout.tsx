import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
  actions: React.ReactNode;
  params: Promise<{ folderId: string }>;
}

import { Folders } from '@/app/services/folders';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import { User } from '@/app/services/user';

export default async function Layout({
  params,
  actions,
  children,
}: LayoutProps) {
  const { folderId } = await params;

  const metadata = await Folders.getMetadataByUid(folderId);

  const session = await getServerSession(authOptions);

  const isAdministrator =
    session?.user?.id && (await User.isAdministrator(session?.user?.id));

  const backButton = (
    <Link
      href="/folders"
      className="rounded-full h-[45px] aspect-square shrink-0 grow-0 bg-gray-100 items-center justify-center flex"
    >
      <svg viewBox="0 0 448 512" height={25}>
        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
      </svg>
    </Link>
  );

  return (
    <main className="flex items-start h-full justify-center w-full overflow-y-auto">
      <>
        <div className="flex flex-col h-auto max-w-[1500px] py-5 w-full">
          <>
            <nav className="flex items-center p-4 justify-between">
              <>
                <span className="flex gap-4 items-center">
                  {backButton}
                  <>
                    <span className="flex flex-col gap-1">
                      <h1 className="text-xl font-medium">
                        {metadata?.name || 'Ukjent mappe'}
                      </h1>
                      <p className="text-sm text-gray-500">
                        {metadata?.description ||
                          'Ingen beskrivelse tilgjengelig.'}
                      </p>
                    </span>
                  </>
                </span>
              </>
              {isAdministrator && actions}
            </nav>
          </>
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 p-4">
            {children}
          </div>
        </div>
      </>
    </main>
  );
}
