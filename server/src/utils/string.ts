export function extractTagFromString(text: string) {
  const tagsWithHash = text.match(/#[^\s,#]+/g);
  const tags = tagsWithHash?.map((tag) => tag.substring(1));
  return tags;
}
