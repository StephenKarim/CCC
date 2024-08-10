import React, { forwardRef } from "react";
import clsx from "clsx";

type BoundedProps = {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

const Bounded = forwardRef<HTMLElement, BoundedProps>(function Bounded(
  { as: Comp = "section", className, children, style, ...restProps },
  ref,
) {
  return (
    <Comp
      ref={ref}
      className={clsx("", className)}
      style={style}
      {...restProps}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center">
        {children}
      </div>
    </Comp>
  );
});

export default Bounded;
