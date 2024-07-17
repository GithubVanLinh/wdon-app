import { ChangeEvent } from "react";

export interface SpanUpInputProps {
  value: string;
  lable?: string;
  type?: "text" | "date";
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function SpanUpInput({
  value,
  lable,
  type = "text",
  onChange,
}: Readonly<SpanUpInputProps>) {
  let _value = value;
  if (type == "date") {
    const date = new Date(value);
    const month = date.getMonth() + 1;

    _value = `${date.getFullYear()}-${
      month < 10 ? `0${month}` : month
    }-${date.getDate()}`;
  }
  return (
    <div className="flex flex-col border border-gray-200">
      <span className="p-2 text-xs">{lable}</span>
      <input
        onChange={onChange}
        type={type}
        value={_value}
        className="p-2 outline-none"
      ></input>
    </div>
  );
}
