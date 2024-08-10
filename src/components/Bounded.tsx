import clsx from "clsx";

type BoundedProps = {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties; // Add style prop
};

export default function Bounded({
  as: Comp = "section",
  className,
  children,
  style, // Add style to the destructured props
  ...restProps
}: BoundedProps) {
  return (
    <Comp
      className={clsx("", className)}
      style={style} // Pass the style prop to the Comp element
      {...restProps}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center">
        {children}
      </div>
    </Comp>
  );
}
