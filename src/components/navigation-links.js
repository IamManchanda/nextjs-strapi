import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import HeaderContext from "@/contexts/header-context";

function NavigationLinks() {
  const router = useRouter();
  const { menuItems, color } = useContext(HeaderContext);
  return (
    <NavigationStyled color={+color}>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id}>
            <Link href={item.slug}>
              <a className={router.pathname === item.slug ? "active" : ""}>
                {item.title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </NavigationStyled>
  );
}

const NavigationStyled = styled.div`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    li {
      margin-left: 10px;
    }
    a {
      text-decoration: none;
      color: ${({ color }) => (color ? "#4C9EE3" : "#000000")};
      &:hover {
        text-decoration: underline;
      }
      &.active {
        color: #ef6800;
      }
    }
  }
`;

export default NavigationLinks;
