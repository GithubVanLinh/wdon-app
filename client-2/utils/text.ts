const input = "hi :v nice to meet you :3";

// Define the replacements
const replacements = {
  ":v": "😄",
  ":3": "😊",
  ":D": "😃",
  ":)": "🙂",
  ":(": "☹️",
  ";)": "😉",
  ":P": "😜",
  ":p": "😜",
  ":o": "😮",
  ":O": "😮",
  ":|": "😐",
  ":-)": "🙂",
  ":-(": "☹️",
  ":-D": "😃",
  ":-P": "😜",
  ":-p": "😜",
  ":-o": "😮",
  ":-O": "😮",
  ":-|": "😐",
  ":*": "😘",
  ":-*": "😘",
  "<3": "❤️",
  "</3": "💔",
  ":@": "😡",
  ":-@": "😡",
  ":$": "😳",
  ":-$": "😳",
  ":^)": "😊",
  ":-^)": "😊",
  ":>": "😏",
  ":-<": "😞",
  ":]": "😊",
  ":-]": "😊",
  ":/": "😕",
  ":-/": "😕",
  ":\\": "😕",
  ":-\\": "😕",
  ":s": "😖",
  ":-s": "😖",
  ":S": "😖",
  ":-S": "😖",
  ":x": "🤐",
  ":-x": "🤐",
  ":X": "🤐",
  ":-X": "🤐",
  ":#": "🤐",
  ":-#": "🤐",
  "8)": "😎",
  "8-)": "😎",
  "B)": "😎",
  "B-)": "😎",
  XD: "😆",
  xD: "😆",
  ":L": "😆",
  ":-L": "😆",
  ":[": "😟",
  ":-[": "😟",
  ">:(": "😠",
  ">:-(": "😠",
  "D:": "😧",
  D8: "😧",
  ":-?": "😕",
  ":?": "😕",
  ":-b": "😛",
  ":b": "😛",
  "<_<": "😒",
  ">_>": "😒",
  T_T: "😢",
  t_t: "😢",
  "T.T": "😢",
  "t.t": "😢",
  ":')": "🙂",
  ":}": "😊",
  "=)": "😊",
  ":c": "😞",
  ":-c": "😞",
  "C:": "😋",
  "c:": "😋",
  "=O": "😮",
  xO: "😮",
  XO: "😮",
  ":8": "🤐",
  ":-8": "🤐",
  ":C": "😞",
  ":-C": "😞",
};

type Code = keyof typeof replacements;

// Escape special regex characters in the keys
const escapeRegex = (string: string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

// Create a regex pattern from the keys of the replacements object
const regexPattern = Object.keys(replacements).map(escapeRegex).join("|");
const regex = new RegExp(`(${regexPattern})`, "g");

export const textToEmojis = (input: string) => {
  const output = input.replace(regex, (match) => replacements[match as Code]);
  return output;
};
