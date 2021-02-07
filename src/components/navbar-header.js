import styled from "@emotion/styled";

function NavbarHeader() {
  return <HeaderStyled>Now I am a Real Header!</HeaderStyled>;
}

const HeaderStyled = styled.header`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 1rem;
`;

export default NavbarHeader;
