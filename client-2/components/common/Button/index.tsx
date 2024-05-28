import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import Loading from "../Loading";

export interface ButtonProps {
  circular?: boolean;
  loading?: boolean;
}

export default function Button({
  circular = true,
  loading = false,
  children,
  ...res
}: Readonly<
  ButtonProps &
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
>) {
  const className = [res.className, "p-2"];
  circular && className.push("rounded-full");
  return (
    <button {...res} className={className.join(" ")} disabled={loading}>
      {loading ? <Loading text="process" /> : children}
    </button>
  );
}
