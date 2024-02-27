import type { ReactNode, FC, SyntheticEvent } from "react";
declare global {
  namespace UI {
    type AlertType = "success" | "failure" | "info" | "warning";

    type Alert = {
      message: string;
      id: number | string;
      variant: AlertType;
      point?: boolean;
    };

    type Drawer = {
      children: ReactNode;
      isOpen: boolean;
      position?: "left" | "right";
      onClose: (val: boolean) => void;
      overlay?: boolean;
      overlayClickClose?: boolean;
      width?: string;
      height?: string;
    };
  }
}
