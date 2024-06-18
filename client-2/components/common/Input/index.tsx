import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export interface InputWithSpanProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  text: string;
}

export default function InputWithSpan({
  text,
  required,
  className,
  value,
  ...res
}: Readonly<InputWithSpanProps>) {
  const listClassName = [className, "border-b p-2 outline-0"];
  const spanClassName = ["text-gray-500 text-sm text-nowrap"];
  if (required && !value) {
    spanClassName.push("after:content-['*'] after:text-red-600");
  }
  return (
    <div className="flex flex-col p-2 relative rounded overflow-hidden">
      <span className={spanClassName.join(" ")}>{text}</span>
      <input
        className={listClassName.join(" ")}
        required={required}
        value={value}
        {...res}
      ></input>
    </div>
  );
}
