'use client';
import { Session } from 'next-auth';
import AvatarDropdown from './ui/avatar/dropdown';
import {
  HeaderButton,
  HeaderContainer,
  HeaderLink,
  HeaderSection,
} from './ui/header';

interface Props {
  session: Session | null;
}

export default function Header({ session }: Props) {
  return (
    <HeaderContainer>
      <HeaderSection>
        <HeaderLink href="/">
          <span className="text-xl font-medium">Fagprøve</span>
        </HeaderLink>
      </HeaderSection>
      <HeaderSection>
        {session ? (
          <AvatarDropdown session={session} />
        ) : (
          <HeaderSection>
            <HeaderLink href="/login">
              <HeaderButton color="primary" variant="light">
                Logg inn
              </HeaderButton>
            </HeaderLink>
            <HeaderLink href="/register">
              <HeaderButton color="primary" variant="solid">
                Registrer deg
              </HeaderButton>
            </HeaderLink>
          </HeaderSection>
        )}
      </HeaderSection>
    </HeaderContainer>
  );
}
