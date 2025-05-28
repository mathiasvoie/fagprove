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
          <span className="text-xl font-medium">Fagprøve</span>
        </HeaderLink>
      </HeaderSection>
      <HeaderSection>
        <HeaderLink href="/login">
          <HeaderButton
            onClick={onSignInButtonClicked}
            color="primary"
            variant="light"
          >
            Logg inn
          </HeaderButton>
        </HeaderLink>

        <HeaderLink href="/register">
          <HeaderButton
            onClick={onSignInButtonClicked}
            color="primary"
            variant="solid"
          >
            Registrer deg
          </HeaderButton>
        </HeaderLink>
      </HeaderSection>
    </HeaderContainer>
  );
}
