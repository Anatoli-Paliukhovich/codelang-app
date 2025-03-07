export const splitCode = (code: string, maxLineLength: number = 80): string => {
  const lines: string[] = [];
  const words = code.split(" ");

  let currentLine = "";

  words.forEach((word) => {
    while (word.length > maxLineLength) {
      lines.push(word.slice(0, maxLineLength));
      word = word.slice(maxLineLength);
    }

    if (
      (currentLine + (currentLine ? " " : "") + word).length > maxLineLength
    ) {
      lines.push(currentLine.trim());
      currentLine = word;
    } else {
      currentLine += (currentLine ? " " : "") + word;
    }
  });

  if (currentLine) {
    lines.push(currentLine.trim());
  }

  return lines.join("\n");
};
