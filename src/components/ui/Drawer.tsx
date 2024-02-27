import type { FC } from "react";

import cn from "clsx";
import { useRef } from "react";

import { useOutsideClick } from "@/shared/hooks";

const Drawer: FC<UI.Drawer> = ({ children, isOpen, position = "left", onClose }) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  useOutsideClick({ setClose: onClose, wrapperRef: drawerRef });

  const drawerClasses = cn(
    "fixed top-0 h-screen bg-black-2 transition-all duration-500 w-96",
    position === "left" ? "left-0 rounded-tr-2xl rounded-br-2xl" : "right-0 rounded-tl-2xl rounded-bl-2xl",
    isOpen ? "translate-x-0" : "-translate-x-full",
  );

  return (
    <div className={drawerClasses} ref={drawerRef}>
      {children}
    </div>
  );
};

export default Drawer;
