import type { RefObject } from "react";

import { useEffect } from "react";

const useOutsideClick = ({
  setClose,
  wrapperRef,
}: {
  setClose: (val: boolean) => void;
  wrapperRef: RefObject<HTMLDivElement>;
}) => {
  useEffect(() => {
    const handleClickListener = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setClose(false);
      }
    };

    document.addEventListener("mousedown", handleClickListener);

    return () => {
      document.removeEventListener("mousedown", handleClickListener);
    };
  }, [setClose, wrapperRef]);
};

export default useOutsideClick;
