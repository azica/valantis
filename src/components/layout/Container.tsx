import cn from "clsx";

const Container: Layout.Container = ({ children, className }) => {
  return <div className={cn(className, "max-w-[1180px] mx-auto px-4")}>{children}</div>;
};

export default Container;
