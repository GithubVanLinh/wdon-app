import { textToEmojis } from "@/utils/text";
import { DivProps } from "@/utils/type/html";

export interface TextTransformerProps {
  text: string;
}

export default function TextTransformer({
  text,
  ...res
}: Readonly<TextTransformerProps & DivProps>) {
  const trasfomed = textToEmojis(text);
  return (
    <div {...res}>
      <div dangerouslySetInnerHTML={{ __html: trasfomed }}></div>
    </div>
  );
}
