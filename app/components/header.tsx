'use client';

import {
  HeaderButton,
  HeaderContainer,
  HeaderLink,
  HeaderSection,
} from './ui/header';

export default function Header() {
  return (
    <HeaderContainer>
      <HeaderSection>
        <HeaderLink href="/">
          <span className="text-xl font-medium">Verktøy Kasse</span>
        </HeaderLink>
      </HeaderSection>
      <HeaderSection>
        <HeaderButton onClick={() => {}}>Logg inn</HeaderButton>
      </HeaderSection>
    </HeaderContainer>
  );
}
