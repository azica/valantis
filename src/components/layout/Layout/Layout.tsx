import { useLocation } from "react-router-dom";

import { Header } from "@/layout/index";

import LayoutContent from "./LayoutContent";

const Layout = () => {
  const { pathname } = useLocation();
  const lastItem = pathname.split("/").at(-1);
  const notHeader =
    lastItem === "auth" ||
    lastItem === "create-office" ||
    lastItem === "password-recovery" ||
    lastItem === "success" ||
    lastItem === "reset-password" ||
    lastItem === "not-found";

  return (
    <>
      {notHeader ? (
        <LayoutContent />
      ) : (
        <>
          <Header />
          <LayoutContent />
        </>
      )}
    </>
  );
};

export default Layout;
