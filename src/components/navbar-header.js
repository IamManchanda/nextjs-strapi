import styled from "@emotion/styled";
import { rem } from "polished";

function NavbarHeader() {
  return (
    <HeaderStyled>
      <div className="container">
        <div className="logo">
          <img src="/images/logo.svg" alt="Sites logo" />
          <span className="logo-text">Next Movies</span>
        </div>
      </div>
    </HeaderStyled>
  );
}

const HeaderStyled = styled.header`
  background: ${({ theme }) => theme.colors.primary};
  padding: 20px;

  .logo {
    display: flex;
    align-items: center;
    .logo-text {
      color: #333333;
      font-weight: bold;
      font-size: ${rem(20)};
      margin-left: 20px;
    }
  }
`;

export default NavbarHeader;
