import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import Loading from "../Loading";
import { ColorKey, ColorPalette, getColor } from "@/config/color";
import { useAppSelector } from "@/lib/hooks";

export interface ButtonProps {
  circular?: boolean;
  loading?: boolean;
  background?: ColorKey;
}

export default function Button({
  circular = true,
  loading = false,
  background = "primary",
  children,
  ...res
}: Readonly<
  ButtonProps &
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
>) {
  const theme = useAppSelector((state) => state.app.theme);
  const className = [res.className, "p-2"];
  circular && className.push("rounded-full");
  if (background == "primary") {
    const palette = getColor(theme);
    className.push(
      palette.primary.background,
      palette.primary.hover,
      palette.primary.text
    );
  }
  return (
    <button {...res} className={className.join(" ")} disabled={loading}>
      {loading ? <Loading text="process" /> : children}
    </button>
  );
}
