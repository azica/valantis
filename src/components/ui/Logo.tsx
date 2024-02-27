import cn from "clsx";
import { Link } from "react-router-dom";

import { LogoIcon } from "@/assets/images";

const Logo = ({ link = "/", className }: { link?: string; className?: string }) => {
  return (
    <Link to={link} className={cn("inline-block w-44 h-10", className)}>
      <LogoIcon className="w-full h-full" />
    </Link>
  );
};

export default Logo;
