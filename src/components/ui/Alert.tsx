import type { ReactNode } from "react";

import { CircleCheck, CircleAlert, TriangleAlert, CircleX } from "akar-icons";
import { Alert as FlowAlert } from "flowbite-react";
import { useSnackbar, SnackbarContent } from "notistack";
import { useCallback, forwardRef } from "react";

export const Alert = forwardRef<HTMLDivElement, UI.Alert>(({ id, variant, message, point = false }, ref) => {
  const { closeSnackbar } = useSnackbar();

  const handleClose = useCallback(() => {
    closeSnackbar(id);
  }, [id, closeSnackbar]);

  const iconMapping: Record<UI.AlertType, ReactNode> = {
    success: <CircleCheck strokeWidth={1.5} size={20} />,
    failure: <CircleX strokeWidth={1.5} size={20} />,
    info: <TriangleAlert strokeWidth={2} size={20} />,
    warning: <CircleAlert strokeWidth={1.5} size={20} />,
  };

  return (
    <SnackbarContent ref={ref}>
      <FlowAlert onDismiss={handleClose} color={variant}>
        <div className="flex items-center gap-4">
          {iconMapping[variant]}
          {message}
        </div>
      </FlowAlert>
    </SnackbarContent>
  );
});

Alert.displayName = "Alert";

export default Alert;
