import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

import { Container } from "@/layout/index";
import { Logo } from "@/ui/index";

const menuList = [
  { name: "About us", link: "about" },
  { name: "Shop", link: "shop" },
];
const Header = () => {
  const MenuItem = ({ name, link }: { name: string; link: string }) => {
    return (
      <li>
        <Link to={link} className="font-medium">
          {name}
        </Link>
      </li>
    );
  };

  return (
    <>
      <header>
        <Container className="flex items-center justify-between my-4">
          <Logo />
          <nav>
            <ul className="flex items-center justify-center gap-x-12">
              {menuList.map((menu, idx) => (
                <MenuItem name={menu.name} link={menu.link} key={idx} />
              ))}
            </ul>
          </nav>
          <Button color="info">Login</Button>
        </Container>
      </header>
    </>
  );
};

export default Header;
