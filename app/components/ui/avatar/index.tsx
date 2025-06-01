import AvatarDropdown from './dropdown';

import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import { getServerSession } from 'next-auth';

export default async function Avatar() {
  const session = await getServerSession(authOptions);

  if (!session) return null;

  return (
    <>
      <AvatarDropdown session={session} />
    </>
  );
}
