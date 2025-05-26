'use client';

import {
  HeaderButton,
  HeaderContainer,
  HeaderLink,
  HeaderSection,
} from './ui/header';

export default function Header() {
  const onSignInButtonClicked = () => {};

  return (
    <HeaderContainer>
      <HeaderSection>
        <HeaderLink href="/">
          <span className="text-xl font-medium">Verktøy Kasse</span>
        </HeaderLink>
      </HeaderSection>
      <HeaderSection>
        <HeaderButton onClick={onSignInButtonClicked} color="primary">
          Logg inn
        </HeaderButton>
      </HeaderSection>
    </HeaderContainer>
  );
}
