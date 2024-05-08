export type ButtonOption = {
  readonly name?: string;
  readonly type: "submit" | "reset" | "button" | undefined;
  readonly onClick?: (e: any) => void;
  readonly className?: string;
  readonly children?: React.ReactNode;
};

export function Button({
  name,
  type,
  onClick,
  className,
  children,
}: ButtonOption) {
  const classname =
    className ??
    "w-full text-white bg-primary hover:bg-primary-hover focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800";
  return (
    <button type={type} className={classname} onClick={onClick}>
      {children || name}
    </button>
  );
}
